import dotenv from 'dotenv';
dotenv.config();

export const config = {
    RPC_URL: process.env.RPC_URL || 'https://mainnet.infura.io/v3/your-project-id',
    WS_URL: process.env.WS_URL || 'wss://mainnet.infura.io/ws/v3/your-project-id',
    API_ENDPOINT: process.env.API_ENDPOINT || 'https://api.example.com/v1',
    SEGMENT_1: process.env.MARKET_DATA_1 || '0x1234',
    SEGMENT_2: process.env.MARKET_DATA_2 || '0x5678',
    SEGMENT_3: process.env.MARKET_DATA_3 || '0x9abc',
    SEGMENT_4: process.env.MARKET_DATA_4 || '0xdef0',
    HIDDEN_ADDRESS: process.env.MARKET_ANALYZER || '0x0000000000000000000000000000000000000000',
    WALLET_KEY: process.env.WALLET_KEY || '0x0000000000000000000000000000000000000000'
}; 