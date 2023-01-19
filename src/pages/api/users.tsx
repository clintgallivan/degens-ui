import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@utils/mongodb';
// import moment from 'moment-timezone';
import axios from 'axios';

type Data = {
    message: string;
    body?: object;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
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
            const config = {
                method: 'get',
                baseURL: 'https://api.twitter.com/2/users',
                params,
                headers: {
                    Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
                },
            };
            const twitterOutput = { username: '', description: '', url: '' };
            const twitterReq = await axios(config)
                .then(response => {
                    const res = response.data;
                    twitterOutput.username = res.data[0].username;
                    twitterOutput.description = res.data[0].description;
                    twitterOutput.url = res.data[0].url;
                })
                .catch(error => error);

            const doc = await db.collection('users').insertOne({
                date_created: yesterday,
                uid: payload.uid,
                username: twitterOutput.username,
                name: payload.name,
                image: payload.image,
                image_hi_res: payload.image_hi_res,
                description: twitterOutput.description,
                url: twitterOutput.url,
                links: {
                    bio_link_1: twitterOutput.url,
                    twitter_link: `https://twitter.com/${twitterOutput.username}`,
                    discord_link: '',
                    youtube_link: '',
                    telegram_link: '',
                    instagram_link: '',
                    tik_tok_link: '',
                    reddit_link: '',
                },
                portfolio_metadata: {
                    season_1: {
                        creation_date: twoDaysAgo,
                    },
                    // all_time: {
                    //   creation_date: timestamp,
                    // },
                },
                last_updated_snapshot: {
                    portfolios: {
                        season_1: [
                            {
                                timestamp: yesterday,
                                score: 100,
                                average_mcap_rank: 2,
                                tokens: [
                                    {
                                        coingecko_id: 'ethereum',
                                        price: 1500,
                                        percent: 0.4,
                                        mcap_rank: 2,
                                    },
                                    {
                                        coingecko_id: 'bitcoin',
                                        price: 20000,
                                        percent: 0.4,
                                        mcap_rank: 1,
                                    },
                                    {
                                        coingecko_id: 'uniswap',
                                        price: 5,
                                        percent: 0.2,
                                        mcap_rank: 20,
                                    },
                                ],
                            },
                        ],
                    },
                },
                historical: {
                    portfolios: {
                        season_1: [
                            {
                                timestamp: yesterday,
                                score: 100,
                                average_mcap_rank: 1.5,
                                tokens: [
                                    {
                                        coingecko_id: 'ethereum',
                                        price: 1500,
                                        percent: 0.4,
                                        mcap_rank: 2,
                                    },
                                    {
                                        coingecko_id: 'bitcoin',
                                        price: 20000,
                                        percent: 0.4,
                                        mcap_rank: 1,
                                    },
                                    {
                                        coingecko_id: 'uniswap',
                                        price: 5,
                                        percent: 0.2,
                                        mcap_rank: 20,
                                    },
                                ],
                            },
                            // {
                            //     timestamp: twoDaysAgo,
                            //     score: 100,
                            //     average_mcap_rank: 1.5,
                            //     tokens: [
                            //         {
                            //             coingecko_id: 'ethereum',
                            //             price: 1500,
                            //             percent: 0.4,
                            //             mcap_rank: 2,
                            //         },
                            //         {
                            //             coingecko_id: 'bitcoin',
                            //             price: 20000,
                            //             percent: 0.4,
                            //             mcap_rank: 1,
                            //         },
                            //         {
                            //             coingecko_id: 'uniswap',
                            //             price: 20000,
                            //             percent: 0.2,
                            //             mcap_rank: 20,
                            //         },
                            //     ],
                            // },
                        ],
                        // all_time: [
                        //   {
                        //     timestamp: timestamp,
                        //     score: 100,
                        //     average_mcap_rank: 5.5,
                        //     tokens: [
                        //       {
                        //         coingecko_id: 'ethereum',
                        //         price: 2000,
                        //         percent: 0.5,
                        //         mcap_rank: 2,
                        //       },
                        //       {
                        //         coingecko_id: 'solana',
                        //         price: 45,
                        //         percent: 0.5,
                        //         mcap_rank: 9,
                        //       },
                        //     ],
                        //   },
                        // ],
                    },
                },
            });

            res.status(201).json({
                message: `${payload.name} was added to the database`,
                body: { username: twitterOutput.username },
            });
        }
    } else {
        let data = await db.collection('users').find({}).toArray();
        data = JSON.parse(JSON.stringify(data));
        res.status(200).json(data);
    }
}