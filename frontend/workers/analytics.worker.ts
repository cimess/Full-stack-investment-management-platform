
// analytics.worker.ts
self.onmessage = (e: MessageEvent) => {
  const { type, payload } = e.data;

  if (type === 'CALCULATE_CHART_DATA') {
    const { portfolioValue, transactions, range = '1W' } = payload;
    const result = [];
    const now = new Date();
    
    let iterations = 7;
    let stepDays = 1;
    let formatOptions: Intl.DateTimeFormatOptions = { weekday: 'short' };

    switch (range) {
      case '1M':
        iterations = 15;
        stepDays = 2;
        formatOptions = { month: 'short', day: 'numeric' };
        break;
      case '6M':
        iterations = 24;
        stepDays = 7;
        formatOptions = { month: 'short', day: 'numeric' };
        break;
      case '1Y':
        iterations = 12;
        stepDays = 30;
        formatOptions = { month: 'short' };
        break;
      case 'ALL':
        iterations = 20;
        stepDays = 90; // Approx every quarter
        formatOptions = { year: '2-digit', month: 'short' };
        break;
      default: // 1W
        iterations = 7;
        stepDays = 1;
        break;
    }

    // Performance optimization: compute net change relative to now, backwards
    for (let i = iterations - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - (i * stepDays));
      
      const label = d.toLocaleDateString('en-US', formatOptions);
      const dayEnd = new Date(d.setHours(23, 59, 59, 999));

      const netChangeSinceThen = transactions
        .filter((tx: any) => new Date(tx.createdAt) > dayEnd)
        .reduce((acc: number, tx: any) => {
          const amount = Number(tx.quantity) * Number(tx.price);
          return tx.type === 'BUY' ? acc + amount : acc - amount;
        }, 0);

      result.push({
        name: label,
        value: Math.max(0, portfolioValue - netChangeSinceThen)
      });
    }

    self.postMessage({ type: 'CHART_DATA_RESULT', data: result });
  }

  if (type === 'CALCULATE_MANAGER_ANALYTICS') {
    const { clients, range = '6M' } = payload;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();
    
    let iterations = 6;
    let stepMonths = 1;

    switch (range) {
      case '1M':
        iterations = 4;
        stepMonths = 0.25; // Weekly for a month
        break;
      case '1Y':
        iterations = 12;
        stepMonths = 1;
        break;
      case 'ALL':
        iterations = 24;
        stepMonths = 1;
        break;
      default: // 6M
        iterations = 6;
        stepMonths = 1;
        break;
    }

    // AUM Trend
    const aumResult = [];
    for (let i = iterations - 1; i >= 0; i--) {
      // Use days for 1M to get weekly points, months for others
      const targetDate = range === '1M' 
        ? new Date(now.getTime() - (i * 7 * 24 * 60 * 60 * 1000))
        : new Date(now.getFullYear(), now.getMonth() - Math.floor(i * stepMonths), 1);

      const monthLabel = months[targetDate.getMonth()];
      const yearLabel = targetDate.getFullYear().toString().slice(-2);
      
      const aumAtMonth = clients.reduce((acc: number, client: any) => {
        if (new Date(client.createdAt) <= targetDate) {
           const val = client.portfolio?.investment?.reduce((pAcc: number, inv: any) => {
             return pAcc + (inv.quantity * (inv.stock?.price || inv.avgPrice));
           }, 0) || 0;
           return acc + val;
        }
        return acc;
      }, 0);
      aumResult.push({ 
        month: range === '1M' ? `W${iterations-i}` : `${monthLabel} '${yearLabel}`, 
        aum: aumAtMonth 
      });
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
    const { transactions, tradeRequests, range = '6M' } = payload;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();
    
    let iterations = 6;
    let stepMonths = 1;

    switch (range) {
      case '1M':
        iterations = 4;
        stepMonths = 0.25;
        break;
      case '1Y':
        iterations = 12;
        stepMonths = 1;
        break;
      case 'ALL':
        iterations = 24;
        stepMonths = 1;
        break;
      default: // 6M
        iterations = 6;
        stepMonths = 1;
        break;
    }

    // Platform Volume Data
    const volumeResult = [];
    for (let i = iterations - 1; i >= 0; i--) {
      const targetDate = range === '1M' 
        ? new Date(now.getTime() - (i * 7 * 24 * 60 * 60 * 1000))
        : new Date(now.getFullYear(), now.getMonth() - Math.floor(i * stepMonths), 1);

      const mLabel = months[targetDate.getMonth()];
      const yLabel = targetDate.getFullYear().toString().slice(-2);
      
      const volume = transactions.reduce((acc: number, t: any) => {
        const tDate = new Date(t.createdAt);
        // Match logic based on scope
        const isMatch = range === '1M'
          ? (tDate.getTime() >= targetDate.getTime() - (7 * 24 * 60 * 60 * 1000) && tDate.getTime() <= targetDate.getTime())
          : (tDate.getMonth() === targetDate.getMonth() && tDate.getFullYear() === targetDate.getFullYear());

        if (isMatch) {
          return acc + (Number(t.amount) || (Number(t.price) * (Number(t.qty) || Number(t.quantity)) || 0));
        }
        return acc;
      }, 0);
      volumeResult.push({ month: range === '1M' ? `W${iterations-i}` : `${mLabel} '${yLabel}`, volume });
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
