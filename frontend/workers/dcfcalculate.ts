/**
 * Certified Top-Down DCF (Discounted Cash Flow) Calculator
 * Based on NYU Stern (Damodaran) and CFI Standards.
 */
export interface ProfessionalDCFInputs {
  currentRevenue: number;         // Trailing 12 Months Revenue
  revenueGrowthRate: number;      // e.g., 0.10 for 10%
  targetOperatingMargin: number;  // e.g., 0.15 for 15% (EBIT / Revenue)
  taxRate: number;                // e.g., 0.21 for 21% Corporate Tax
  reinvestmentMargin: number;

  years: number;                  // Projection period (e.g., 5 or 10)
  discountRate: number;           // WACC (e.g., 0.09 for 9%)
  terminalGrowthRate: number;     // e.g., 0.025 for 2.5%
  
  totalDebt: number;
  totalCash: number;
  sharesOutstanding: number;
}

export function calculateProfessionalDCF(inputs: ProfessionalDCFInputs) {
  if(!inputs.currentRevenue || !inputs.totalDebt || !inputs.totalCash || !inputs.sharesOutstanding){
    return {
      intrinsicValue: 0,
      enterpriseValue: 0,
      equityValue: 0,
      discountedTerminalValue: 0,
      financialTable: []
    };
  }
  const { 
    currentRevenue, revenueGrowthRate, targetOperatingMargin, taxRate, 
    years, discountRate, terminalGrowthRate, totalDebt, totalCash, sharesOutstanding, reinvestmentMargin 
  } = inputs;

  let presentValueSum = 0;
  let projectedRevenue = currentRevenue;
  let lastYearFCFF = 0; // We need this to calculate the Terminal Value at the end

  // Array to hold the step-by-step breakdown (just like AlphaSpread's table)
  const financialTable = []; 

  // 1. Calculate the Top-Down Income Statement for each year
  for (let i = 1; i <= years; i++) {
    // 1A. Grow Revenue
    projectedRevenue = projectedRevenue * (1 + revenueGrowthRate);
    
    // 1B. Operating Income (EBIT)
    const operatingIncome = projectedRevenue * targetOperatingMargin;
    
    // 1C. Taxes
    const taxes = operatingIncome * taxRate;
    
    // 1D. NOPAT / FCFF
    const nopat = operatingIncome - taxes;

    const reinvestment = projectedRevenue * reinvestmentMargin;

    const fcff = nopat-reinvestment; // Sticking to the standard you pasted from AlphaSpread
    lastYearFCFF = fcff;

    // 1E. Discount to Present Value
    const presentValue = fcff / Math.pow(1 + discountRate, i);
    presentValueSum += presentValue;

    // Store it so we can render it in a UI table later if we want!
    financialTable.push({
      year: i,
      revenue: projectedRevenue,
      operatingIncome,
      taxes,
      fcff,
      presentValue
    });
  }

  // 2. Terminal Value (Gordon Growth Model)
  // TV = Final Year FCFF * (1 + Terminal Growth) / (WACC - Terminal Growth)
  const terminalValue = (lastYearFCFF * (1 + terminalGrowthRate)) / (discountRate - terminalGrowthRate);
  const discountedTerminalValue = terminalValue / Math.pow(1 + discountRate, years);

  // 3. Enterprise Value (Sum of PVs + Discounted Terminal Value)
  const enterpriseValue = presentValueSum + discountedTerminalValue;

  // 4. Equity Value (Enterprise Value + Cash - Debt)
  const equityValue = enterpriseValue + totalCash - totalDebt;

  // 5. Intrinsic Value per Share
  const intrinsicValuePerShare = equityValue / sharesOutstanding;

  return {
    intrinsicValue: intrinsicValuePerShare > 0 ? intrinsicValuePerShare : 0,
    enterpriseValue,
    equityValue,
    discountedTerminalValue,
    financialTable // This contains all the rows AlphaSpread showed!
  };
}
