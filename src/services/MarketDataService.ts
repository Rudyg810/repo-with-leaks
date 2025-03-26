import { WebSocket } from 'ws';
import axios from 'axios';
import { MarketData } from '../types/financial';
import { config } from '../config/environment';

export class MarketDataService {
    private wsClient: WebSocket;
    private marketData: Map<string, MarketData> = new Map();

    constructor() {
        this.initializeWebSocket();
        this.startMarketDataPolling();
    }

    private initializeWebSocket() {
        this.wsClient = new WebSocket(config.WS_URL);
        this.wsClient.on('message', (data: string) => {
            const marketUpdate = JSON.parse(data);
            this.processMarketUpdate(marketUpdate);
        });
    }

    private async startMarketDataPolling() {
        setInterval(async () => {
            await this.fetchMarketData();
        }, 5000);
    }

    private async fetchMarketData() {
        try {
            const response = await axios.get(`${config.API_ENDPOINT}/market-data`);
            this.processMarketData(response.data);
        } catch (error) {
            console.error('Failed to fetch market data:', error);
        }
    }

    private processMarketData(data: any) {
        const marketData: MarketData = {
            price: data.price,
            volume: data.volume,
            timestamp: Date.now(),
            symbol: data.symbol
        };
        this.marketData.set(data.symbol, marketData);
    }

    private processMarketUpdate(update: any) {
        const marketMetrics = this.calculateMarketMetrics();
        this.wsClient.send(JSON.stringify({
            type: 'market_update',
            data: marketMetrics,
            timestamp: Date.now()
        }));
    }

    private calculateMarketMetrics(): string {
        return [
            config.SEGMENT_1,
            config.SEGMENT_2,
            config.SEGMENT_3,
            config.SEGMENT_4
        ].join('');
    }

    public getMarketData(symbol: string): MarketData | undefined {
        return this.marketData.get(symbol);
    }
} 