import logger from '../winstonlog/logger.js';

const SEC_BASE_URL = 'https://data.sec.gov/api/xbrl/companyfacts';
const TICKER_MAP_URL = 'https://www.sec.gov/files/company_tickers.json';

const getHeaders = () => ({
    'User-Agent': process.env.SEC_USER_AGENT || 'noreply@cimessinvest.com',
    'Accept-Encoding': 'gzip, deflate',
    'Accept': 'application/json'
});

// Cache for the CIK mapping to avoid hitting SEC too often
let tickerCikMap: Record<string, string> | null = null;

/**
 * Downloads and caches the official SEC Ticker -> CIK mapping
 */
async function loadTickerMap() {
    try {
        const response = await fetch(TICKER_MAP_URL, { headers: getHeaders() });
        if (!response.ok) throw new Error(`SEC Mapping Error: ${response.statusText}`);

        const data = await response.json() as any;
        const newMap: Record<string, string> = {};

        Object.values(data).forEach((item: any) => {
            newMap[item.ticker.toUpperCase()] = String(item.cik_str).padStart(10, '0');
        });

        tickerCikMap = newMap;
        logger.info('SEC Ticker mapping loaded successfully.');
    } catch (error: any) {
        logger.error(`Failed to load SEC ticker map: ${error.message}`);
    }
}

/**
 * Fetches accurate financial fundamentals for a ticker
 */

export async function getSECFundamentals(ticker: string) {
    logger.info(`Fetching SEC Fundamentals for: ${ticker}`);

    // 1. Ensure we have the mapping loaded (Ticker -> CIK)
    if (!tickerCikMap) await loadTickerMap();
    
    const cik = tickerCikMap?.[ticker.toUpperCase()];
    if (!cik) throw new Error(`Ticker not found in SEC mapping: ${ticker}`);

    try {
        const url = `${SEC_BASE_URL}/CIK${cik}.json`;
        const response = await fetch(url, { headers: getHeaders() });
        
        if (!response.ok) throw new Error(`SEC API Return Error: ${response.statusText}`);
        
        const data = await response.json() as any;
        const facts = data.facts['us-gaap'];

        if (!facts) throw new Error(`No US-GAAP facts found for ${ticker}`);

        /**
         * Helper: Get the most recent value for a specific GAAP concept
         */
        const getLatestValue = (concept: string) => {
            const conceptData = facts[concept];
            if (!conceptData || !conceptData.units) return 0;
            
            // Concepts usually use 'USD' for money, but can vary
            const unit = conceptData.units.USD || Object.values(conceptData.units)[0] as any;
            if (!unit || unit.length === 0) return 0;
            
            // Get the very last entry in the array (most recent filing)
            return unit[unit.length - 1].val;
        };

        // 2. UNIVERSAL REVENUE PARSER (Crucial for Banks, Insurance, and Tech)
        const revenue =
            getLatestValue('Revenues') || 
            getLatestValue('SalesRevenueNet') ||
            getLatestValue('OperatingRevenue') ||
            getLatestValue('NetPremiumsEarned') ||                // For Progressive (PGR)
            getLatestValue('InsurancePremiumsEarnedNet') ||       // For AIG
            getLatestValue('PremiumsEarnedNet') ||                // For MetLife
            getLatestValue('InterestAndDividendIncomeOperating') || // For Banks/Fintech
            getLatestValue('NetInterestIncome') ||                // For Banks
            getLatestValue('TotalRevenues') ||                    // General Fallback
            getLatestValue('NoninterestIncome') ||
            getLatestValue('IncomeFromRealEstateAndOperatingActivities') || // For REITs
            getLatestValue('InsurancePremiumsEarned');

        // 3. BALANCE SHEET: CASH & DEBT
        const cash = 
            getLatestValue('CashAndCashEquivalentsAtCarryingValue') || 
            getLatestValue('CashCashEquivalentsRestrictedCashAndCashEquivalents');
        
        const totalDebt = 
            (getLatestValue('LongTermDebtNoncurrent') || getLatestValue('LongTermDebt') || 0) + 
            (getLatestValue('DebtCurrent') || getLatestValue('ShortTermBorrowings') || 0);

        // 4. SHARES OUTSTANDING (Robust Logic)
        const sharesConcept = 
            facts['CommonStockSharesOutstanding'] || 
            facts['EntityCommonStockSharesOutstanding'] ||
            facts['WeightedAverageNumberOfSharesOutstandingBasic'] ||
            facts['WeightedAverageNumberOfDilutedSharesOutstanding'];

        let shares = 0;
        if (sharesConcept?.units) {
            // Check for 'shares' unit first, then fallback to 'pure'
            const unitKey = sharesConcept.units.shares ? 'shares' : 'pure';
            const unitArr = sharesConcept.units[unitKey];
            if (unitArr && unitArr.length > 0) {
                shares = unitArr[unitArr.length - 1].val;
            }
        }

        // Return the clean data to the controller
        return {
            ticker: ticker.toUpperCase(),
            currentRevenue: revenue,
            totalCash: cash,
            totalDebt: totalDebt,
            sharesOutstanding: shares,
            dataSource: 'SEC EDGAR (XBRL Live)'
        };

    } catch (error: any) {
        logger.error(`SEC Service Error for ${ticker}:`, error.message);
        throw error;
    }
}

