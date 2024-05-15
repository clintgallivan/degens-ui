import { ObjectId } from "mongodb";

type wallet = {
    _id: string;
    user_id: ObjectId;
    address: string;
    chain: string;
    public: boolean;
    verified: boolean;
    created_at: Date;
    updated_at: Date;
};

type walletDbCollection = wallet[]

export interface PortfolioToken {
    coingecko_id: string;
    price: number;
    percent: number;
    mcap_rank: number;
    image: string;
}

export interface PortfolioSnapshot {
    timestamp: Date;
    score: number;
    average_mcap_rank: number;
    tokens: PortfolioToken[];
}

export interface PortfolioMetadata {
    season_1: { creation_date: Date };
    all_time: { creation_date: Date };
}

export interface UserLinks {
    bio_link_1?: string;
    twitter_link?: string;
    discord_link?: string;
    youtube_link?: string;
    telegram_link?: string;
    instagram_link?: string;
    tik_tok_link?: string;
    reddit_link?: string;
}

export interface User {
    _id: string;
    date_created: Date;
    uid: string;
    username: string;
    name: string;
    image: string;
    image_hi_res: string;
    description: string;
    url: string;
    links: UserLinks;
    portfolio_metadata: PortfolioMetadata;
    last_updated_snapshot: {
        portfolios: {
            [key: string]: PortfolioSnapshot[];
        };
    };
    historical: {
        portfolios: {
            [key: string]: PortfolioSnapshot[];
        };
    };
}

type userDBCollection = User[]

type TimeSeriesEntry = {
    _id: ObjectId, // MongoDB's unique identifier
    user_id: ObjectId, // Reference to User document
    portfolio_id: String, // If you have multiple portfolios per user
    timestamp: Date,
    score: Number,
    average_mcap_rank: Number,
    tokens: [
        {
            coingecko_id: String,
            token_id: ObjectId, // Reference to Token document
            price: Number,
            percent: Number,
            mcap_rank: Number,
            image: String,
        },
    ],
}

type historicalPortfoliosDBCollection = TimeSeriesEntry[]