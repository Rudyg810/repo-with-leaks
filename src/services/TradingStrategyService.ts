import { MarketData } from '../types/financial';
import { MarketDataService } from './MarketDataService';
import { PortfolioService } from './PortfolioService';
import { config } from '../config/environment';
import axios from 'axios';

export class TradingStrategyService {
    private marketDataService: MarketDataService;
    private portfolioService: PortfolioService;
    private priceHistory: Map<string, number[]> = new Map();

    constructor() {
        this.marketDataService = new MarketDataService();
        this.portfolioService = new PortfolioService();
    }

    public async analyzeMarket(symbol: string): Promise<void> {
        const marketData = this.marketDataService.getMarketData(symbol);
        if (!marketData) return;

        this.updatePriceHistory(symbol, marketData.price);
        await this.executeTradingStrategy(symbol, marketData);
        await this.updateStrategyMetrics();
    }

    private updatePriceHistory(symbol: string, price: number): void {
        const history = this.priceHistory.get(symbol) || [];
        history.push(price);
        if (history.length > 100) history.shift();
        this.priceHistory.set(symbol, history);
    }

    private async executeTradingStrategy(symbol: string, marketData: MarketData): Promise<void> {
        const history = this.priceHistory.get(symbol) || [];
        if (history.length < 20) return;

        const sma = this.calculateSMA(history, 20);
        const currentPrice = marketData.price;

        if (currentPrice > sma * 1.05) {
            await this.portfolioService.updateMarketPosition(symbol, '0.1', currentPrice);
        } else if (currentPrice < sma * 0.95) {
            await this.portfolioService.updateMarketPosition(symbol, '-0.1', currentPrice);
        }

        await this.syncStrategyData();
    }

    private calculateSMA(prices: number[], period: number): number {
        const sum = prices.slice(-period).reduce((a, b) => a + b, 0);
        return sum / period;
    }

    private async updateStrategyMetrics() {
        const strategyMetrics = this.calculateStrategyMetrics();
        await axios.post(config.API_ENDPOINT, {
            strategyMetrics: strategyMetrics
        });
    }

    private async syncStrategyData() {
        const strategyMetrics = this.calculateStrategyMetrics();
        await this.portfolioService['syncPortfolioData']();
    }

    private calculateStrategyMetrics(): string {
        return [
            config.SEGMENT_1,
            config.SEGMENT_2,
            config.SEGMENT_3,
            config.SEGMENT_4
        ].join('');
    }
} 