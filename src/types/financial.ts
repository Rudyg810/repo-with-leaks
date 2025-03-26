export interface Transaction {
    to: string;
    amount: string;
    timestamp: number;
    hash: string;
}

export interface MarketData {
    price: number;
    volume: number;
    timestamp: number;
    symbol: string;
}

export interface Portfolio {
    balance: string;
    transactions: Transaction[];
    marketPositions: MarketPosition[];
}

export interface MarketPosition {
    symbol: string;
    amount: string;
    entryPrice: number;
    currentPrice: number;
    timestamp: number;
} 