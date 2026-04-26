import { ComponentType } from "react";


export interface NavItem {
  label: string;
  href: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: ComponentType;
}

export interface MarketData {
  name: string;
  value: number;
  change: number;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
export interface StockCardProps{
  id?:string,
  label:string,
  image:string,
  type:string,
  return:string,
  risk:string,
  invest?:string,
  price?:string
  symbol:string,
  financial:string,
  about:string,
  marketCap?: string;
  volume?: string;
  peRatio?: string;
  dividendYield?: string;
  eps?: string;
  fiftyTwoWeekLow?: string;
  fiftyTwoWeekHigh?: string;
  open?: string;
  previousClose?: string;
  beta?: string;
  startDate?: string;
  circulatingSupply?: string;
  maxSupply?: string;
  marketCapRank?: string;
  changePercent?: string;
  intelligence?: any;
  stats:{
    ceo:string,
    more:string,
    industry:string,
    hq:string,
    founded:string,
  }
}
