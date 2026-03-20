
// analytics.worker.ts
self.onmessage = (e: MessageEvent) => {
  const { type, payload } = e.data;

  if (type === 'CALCULATE_CHART_DATA') {
    const { portfolioValue, transactions } = payload;
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const result = [];
    const now = new Date();
    
    // Performance optimization: compute net change relative to now, backwards
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      const dayName = days[d.getDay()];
      const dayEnd = new Date(d.setHours(23, 59, 59, 999));

      const netChangeSinceThen = transactions
        .filter((tx: any) => new Date(tx.createdAt) > dayEnd)
        .reduce((acc: number, tx: any) => {
          const amount = Number(tx.quantity) * Number(tx.price);
          return tx.type === 'BUY' ? acc + amount : acc - amount;
        }, 0);

      result.push({
        name: dayName,
        value: Math.max(0, portfolioValue - netChangeSinceThen)
      });
    }

    self.postMessage({ type: 'CHART_DATA_RESULT', data: result });
  }

  if (type === 'CALCULATE_MANAGER_ANALYTICS') {
    const { clients } = payload;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();
    
    // AUM Trend
    const aumResult = [];
    for (let i = 5; i >= 0; i--) {
      const targetDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthLabel = months[targetDate.getMonth()];
      
      const aumAtMonth = clients.reduce((acc: number, client: any) => {
        if (new Date(client.createdAt) <= new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0)) {
           const val = client.portfolio?.investment?.reduce((pAcc: number, inv: any) => {
             return pAcc + (inv.quantity * (inv.stock?.price || inv.avgPrice));
           }, 0) || 0;
           return acc + val;
        }
        return acc;
      }, 0);
      aumResult.push({ month: monthLabel, aum: aumAtMonth });
    }

    // Request Volume
    const volumeResult = [];
    for (let i = 4; i >= 1; i--) {
      const weekStart = new Date(now.getTime() - (i * 7 * 24 * 60 * 60 * 1000));
      const weekEnd = new Date(now.getTime() - ((i - 1) * 7 * 24 * 60 * 60 * 1000));
      let buyCount = 0;
      let sellCount = 0;

      clients.forEach((client: any) => {
        client.portfolio?.trade_request?.forEach((req: any) => {
          const reqDate = new Date(req.createdAt);
          if (reqDate >= weekStart && reqDate < weekEnd) {
            if (req.type === 'BUY') buyCount++;
            else if (req.type === 'SELL') sellCount++;
          }
        });
      });
      volumeResult.push({ week: `W${5-i}`, buy: buyCount, sell: sellCount });
    }

    self.postMessage({ 
      type: 'MANAGER_ANALYTICS_RESULT', 
      data: { aumData: aumResult, requestVolumeData: volumeResult } 
    });
  }

  if (type === 'CALCULATE_ADMIN_ANALYTICS') {
    const { transactions, tradeRequests } = payload;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();
    
    // Platform Volume Data
    const volumeResult = [];
    for (let i = 5; i >= 0; i--) {
      const targetDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const mLabel = months[targetDate.getMonth()];
      
      const volume = transactions.reduce((acc: number, t: any) => {
        const tDate = new Date(t.createdAt);
        if (tDate.getMonth() === targetDate.getMonth() && tDate.getFullYear() === targetDate.getFullYear()) {
          return acc + (Number(t.amount) || (Number(t.price) * (Number(t.qty) || Number(t.quantity)) || 0));
        }
        return acc;
      }, 0);
      volumeResult.push({ month: mLabel, volume });
    }

    // Trade Status Data
    const success = tradeRequests.filter((r: any) => r.status === 'SUCCESS').length;
    const rejected = tradeRequests.filter((r: any) => r.status === 'REJECTED').length;
    const pending = tradeRequests.filter((r: any) => r.status === 'PENDING').length;
    
    const statusResult = [
      { status: 'Success', count: success },
      { status: 'Rejected', count: rejected },
      { status: 'Pending', count: pending }
    ];

    self.postMessage({
      type: 'ADMIN_ANALYTICS_RESULT',
      data: { platformVolumeData: volumeResult, tradeStatusData: statusResult }
    });
  }
};
