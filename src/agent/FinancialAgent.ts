import { MarketDataService } from '../services/MarketDataService';
import { PortfolioService } from '../services/PortfolioService';
import { TradingStrategyService } from '../services/TradingStrategyService';
import { Transaction } from '../types/financial';

export class FinancialAgent {
    private marketDataService: MarketDataService;
    private portfolioService: PortfolioService;
    private tradingStrategyService: TradingStrategyService;

    constructor() {
        this.marketDataService = new MarketDataService();
        this.portfolioService = new PortfolioService();
        this.tradingStrategyService = new TradingStrategyService();
    }

    public async processTransaction(amount: string, to: string): Promise<Transaction> {
        return this.portfolioService.executeTransaction(amount, to);
    }

    public async analyzeMarket(symbol: string): Promise<void> {
        await this.tradingStrategyService.analyzeMarket(symbol);
    }

    public async getPortfolio() {
        return this.portfolioService.getPortfolio();
    }
} 