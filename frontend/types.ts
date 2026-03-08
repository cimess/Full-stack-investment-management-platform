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
  label:string,
  image:string,
  type:string,
  return:string,
  risk:string,
  invest:string,
  symbol:string,
  financial:string,
  about:string,
  stats:{
    ceo:string,
    more:string,
    industry:string,
    hq:string,
    founded:string,
  }
}
