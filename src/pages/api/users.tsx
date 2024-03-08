import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@utils/mongodb';
// import moment from 'moment-timezone';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cors from 'cors';

type Data = {
    message: string;
    body?: object;
    status?: string;
};

const corsMiddleware = cors({
    origin: process.env.CLIENT_ORIGIN, // replace with your client's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'x-auth-token'],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result);
            }

            return resolve(result);
        });
    });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    await runMiddleware(req, res, corsMiddleware);
    if (req.headers['x-auth-token'] !== process.env.NEXT_PUBLIC_SHARED_SECRET) {
        res.status(403).json({ message: 'Unauthorized', status: 'failed' });
        return;
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    if (req.method === 'POST') {
        const localDate = new Date();
        const yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);
        const twoDaysAgo = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24 * 2);
        // const timestamp = moment.utc(yesterday).format();

        // const timestamp2 = moment.utc(twoDaysAgo).format();
        const payload = req.body;
        const existingDocument = await db.collection('users').find({ uid: payload.uid }).toArray();
        if (existingDocument.length != 0) {
            res.status(409).json({ message: 'User already exists', body: existingDocument });
        } else {
            const params = new URLSearchParams();
            params.append('ids', payload.uid);
            params.append('user.fields', 'description,url,username');

            const twitterOutput = { username: '', description: '', url: '' };
            try {
                // * disabled for now because twitter api is not paid for
                // const twitterRes = await axios.get(
                //     `${process.env.NEXT_PUBLIC_TWITTER_BASE_URL}/users`,
                //     { params },
                // );
                // twitterOutput.username = twitterRes.data.data[0].username;
                // twitterOutput.description = twitterRes.data.data[0].description;
                // twitterOutput.url = twitterRes.data.data[0].url;
                // console.log(twitterRes.data);
            } catch (error) {
                // do nothing
            }

            await db.collection('users').insertOne({
                date_created: localDate,
                uid: payload.uid,
                username: twitterOutput.username,
                name: payload.name,
                image: payload.image,
                image_hi_res: payload.image_hi_res,
                description: twitterOutput.description,
                url: twitterOutput.url,
                links: {
                    bio_link_1: twitterOutput.url,
                    twitter_link: '',
                    discord_link: '',
                    youtube_link: '',
                    telegram_link: '',
                    instagram_link: '',
                    tik_tok_link: '',
                    reddit_link: '',
                },
                portfolio_metadata: {
                    season_1: {
                        creation_date: localDate,
                    },
                    all_time: {
                        creation_date: localDate,
                    },
                },
                last_updated_snapshot: {
                    portfolios: {
                        season_1: [
                            {
                                timestamp: localDate,
                                score: 100,
                                average_mcap_rank: 9,
                                tokens: [
                                    {
                                        coingecko_id: 'usd-coin',
                                        price: 1,
                                        percent: 1,
                                        mcap_rank: 8,
                                        image: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389',
                                    },
                                ],
                            },
                            // {
                            //     timestamp: localDate,
                            //     score: 100,
                            //     average_mcap_rank: 5.2,
                            //     tokens: [
                            //         {
                            //             coingecko_id: 'ethereum',
                            //             price: 3300,
                            //             percent: 0.4,
                            //             mcap_rank: 2,
                            //             image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880',
                            //         },
                            //         {
                            //             coingecko_id: 'bitcoin',
                            //             price: 60000,
                            //             percent: 0.4,
                            //             mcap_rank: 1,
                            //             image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
                            //         },
                            //         {
                            //             coingecko_id: 'uniswap',
                            //             price: 10,
                            //             percent: 0.2,
                            //             mcap_rank: 20,
                            //             image: 'https://assets.coingecko.com/coins/images/12504/large/uniswap-uni.png?1600306604',
                            //         },
                            //     ],
                            // },
                        ],
                        all_time: [
                            {
                                timestamp: localDate,
                                score: 100,
                                average_mcap_rank: 9,
                                tokens: [
                                    {
                                        coingecko_id: 'usd-coin',
                                        price: 1,
                                        percent: 1,
                                        mcap_rank: 8,
                                        image: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389',
                                    },
                                ],
                            },
                            // {
                            //     timestamp: localDate,
                            //     score: 100,
                            //     average_mcap_rank: 10,
                            //     tokens: [
                            //         {
                            //             coingecko_id: 'dogecoin',
                            //             price: 0.08,
                            //             percent: 0.5,
                            //             mcap_rank: 9,
                            //             image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png?1547792256',
                            //         },
                            //         {
                            //             coingecko_id: 'solana',
                            //             price: 25,
                            //             percent: 0.5,
                            //             mcap_rank: 11,
                            //             image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png?1640133422',
                            //         },
                            //     ],
                            // },
                        ],
                    },
                },
                historical: {
                    portfolios: {
                        season_1: [
                            {
                                timestamp: localDate,
                                score: 100,
                                average_mcap_rank: 9,
                                tokens: [
                                    {
                                        coingecko_id: 'usd-coin',
                                        price: 1,
                                        percent: 1,
                                        mcap_rank: 8,
                                        image: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389',
                                    },
                                ],
                            },
                            // {
                            //     timestamp: localDate,
                            //     score: 100,
                            //     average_mcap_rank: 5.2,
                            //     tokens: [
                            //         {
                            //             coingecko_id: 'ethereum',
                            //             price: 1500,
                            //             percent: 0.4,
                            //             mcap_rank: 2,
                            //             image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880',
                            //         },
                            //         {
                            //             coingecko_id: 'bitcoin',
                            //             price: 20000,
                            //             percent: 0.4,
                            //             mcap_rank: 1,
                            //             image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
                            //         },
                            //         {
                            //             coingecko_id: 'uniswap',
                            //             price: 5,
                            //             percent: 0.2,
                            //             mcap_rank: 20,
                            //             image: 'https://assets.coingecko.com/coins/images/12504/large/uniswap-uni.png?1600306604',
                            //         },
                            //     ],
                            // },
                        ],
                        all_time: [
                            {
                                timestamp: localDate,
                                score: 100,
                                average_mcap_rank: 9,
                                tokens: [
                                    {
                                        coingecko_id: 'usd-coin',
                                        price: 1,
                                        percent: 1,
                                        mcap_rank: 8,
                                        image: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389',
                                    },
                                ],
                            },
                            // {
                            //     timestamp: localDate,
                            //     score: 100,
                            //     average_mcap_rank: 10,
                            //     tokens: [
                            //         {
                            //             coingecko_id: 'dogecoin',
                            //             price: 0.08,
                            //             percent: 0.5,
                            //             mcap_rank: 9,
                            //             image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png?1547792256',
                            //         },
                            //         {
                            //             coingecko_id: 'solana',
                            //             price: 25,
                            //             percent: 0.5,
                            //             mcap_rank: 11,
                            //             image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png?1640133422',
                            //         },
                            //     ],
                            // },
                        ],
                    },
                },
            });

            res.status(201).json({
                message: `${payload.name} was added to the database`,
                body: { username: twitterOutput.username },
            });
        }
    } else if (req.method === 'GET') {
        let data = await db.collection('users').find({}).toArray();
        res.status(200).json(data);
    } else {
        res.status(400).json({ message: 'Invalid request method', status: 'failed' });
    }
}
