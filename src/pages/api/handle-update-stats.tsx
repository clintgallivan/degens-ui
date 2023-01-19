import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@utils/mongodb';
import moment from 'moment-timezone';
import axios from 'axios';
import { log } from '@utils/console';

type Data = {
    message: string;
    body?: object;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const coingeckoBaseUrl = process.env.COINGECKO_BASE_URL;
    const now: any = new Date();
    // * update the "last_updated_at" object with the most recent values (hit the coins/markets api)
    // * make an api call to coingecko for live price on thier tokens
    // * for each token requested/resonded with, update the user
    // * if last_updated_at is within 1 hr, disable update button with "up-to-date" button

    if (req.method === 'POST') {
        const localDate = new Date();
        const timestamp = moment.utc(localDate).format();
        const payload = req.body;
        const newUserData: any = [];

        const createTokenListToUpdateUser = (userInfo: any) => {
            const tokenSet: any = new Set([]);
            const { portfolios } = userInfo.historical;
            Object.keys(portfolios).forEach(portfolio => {
                const tokenObjs = portfolios[portfolio][0].tokens;
                Object.keys(tokenObjs).forEach(id => {
                    const coingeckoId = tokenObjs[id].coingecko_id;
                    tokenSet.add(coingeckoId);
                });
            });
            return Array.from(tokenSet);
        };

        const getCurrentPrices = async (tokenList: any) => {
            const output: any = {};
            const parsedTokenIds = tokenList.join(',');
            const params = {
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: 250,
                page: 1,
                ids: parsedTokenIds,
            };
            try {
                const coingeckoResponse = await axios.get(`${coingeckoBaseUrl}/coins/markets`, {
                    params,
                });
                coingeckoResponse.data.forEach((i: any) => {
                    output[i.id] = {
                        current_price: i.current_price,
                        mcap_rank: i.market_cap_rank,
                        image: i.image,
                    };
                });
            } catch (e) {
                console.log(e);
            }
            return output;
        };

        const runCalcsAndUpdateUser = (userInfo: any, currentPrices: any) => {
            const userUpdated = userInfo;
            const historicalPorfolios = userInfo.historical.portfolios;
            Object.keys(historicalPorfolios).forEach(portfolio => {
                const scoreOriginal = historicalPorfolios[portfolio][0].score;
                const tokenObjs = historicalPorfolios[portfolio][0].tokens;

                const percentScoreIncreaseAndNewTokenArr = () => {
                    let totalWeight = 0;
                    tokenObjs.forEach((tokenObj: any) => {
                        const priceAfter = currentPrices[tokenObj.coingecko_id].current_price;
                        const priceBefore = tokenObj.price;
                        const { percent } = tokenObj;
                        const weightedChange = (priceAfter / priceBefore) * percent;
                        totalWeight += weightedChange;
                    });
                    const newTokens: any = [];
                    tokenObjs.forEach((tokenObj: any) => {
                        const priceAfter = currentPrices[tokenObj.coingecko_id].current_price;
                        const priceBefore = tokenObj.price;
                        const { percent } = tokenObj;
                        const weightedChange = (priceAfter / priceBefore) * percent;
                        const newToken = {
                            coingecko_id: tokenObj.coingecko_id,
                            price: priceAfter,
                            percent: weightedChange / totalWeight,
                            mcap_rank: currentPrices[tokenObj.coingecko_id].mcap_rank,
                            image: currentPrices[tokenObj.coingecko_id].image,
                        };

                        newTokens.push(newToken);
                    });
                    userUpdated.historical.portfolios[portfolio][0].tokens = newTokens;
                    return totalWeight;
                };
                const updateScore = () => {
                    const scoreAfter = percentScoreIncreaseAndNewTokenArr() * scoreOriginal;
                    userUpdated.historical.portfolios[portfolio][0].score = scoreAfter;
                };
                const updateTimestamp = () => {
                    userUpdated.historical.portfolios[portfolio][0].timestamp =
                        new Date().toISOString();
                };
                const updateAvgMcapRank = () => {
                    const ogPrev: any = new Date(
                        userInfo.historical.portfolios[portfolio][0].timestamp,
                    );
                    const ogCrea: any = new Date(
                        userInfo.portfolio_metadata[portfolio].creation_date,
                    );
                    const previousPeriodDuration = ogPrev - ogCrea;
                    const currentPeriodDuration = now - ogPrev;
                    const totalDuration = currentPeriodDuration + previousPeriodDuration;
                    const currentPeriodTotalWeight = currentPeriodDuration / totalDuration;
                    const previousPeriodTotalWeight = previousPeriodDuration / totalDuration;
                    const currentPeriodAvgMcapRank = () => {
                        let totalAvg = 0;
                        userInfo.historical.portfolios[portfolio][0].tokens.forEach((i: any) => {
                            const { mcapRank } = i;
                            const startingPercent = i.percent;
                            let endingPercent = startingPercent;
                            userUpdated.historical.portfolios[portfolio][0].tokens.forEach(
                                (tokenObj1: any) => {
                                    if (i.coingecko_id === tokenObj1.coingecko_id) {
                                        endingPercent = tokenObj1.percent;
                                    }
                                },
                            );
                            const avgPercent = (startingPercent + endingPercent) / 2;
                            totalAvg += mcapRank * avgPercent;
                        });
                        return totalAvg;
                    };
                    const previousPeriodAvg =
                        previousPeriodTotalWeight *
                        userInfo.historical.portfolios[portfolio][0].average_mcap_rank;
                    const currentPeriodAvg = currentPeriodTotalWeight * currentPeriodAvgMcapRank();
                    const newAvgRank = previousPeriodAvg + currentPeriodAvg;
                    userUpdated.historical.portfolios[portfolio][0].average_mcap_rank = newAvgRank;
                };
                updateScore();
                updateAvgMcapRank();
                updateTimestamp();
            });
            newUserData.push(userUpdated);
        };

        const postToDb = async () => {
            console.log(JSON.stringify(newUserData));
            const portfolioToPush: any = {};
            let bulkRequests = [];
            Object.keys(newUserData[0].historical.portfolios).forEach(portfolio => {
                const strToDatetime = (timestampAsStr: any) =>
                    new Date(moment.utc(timestampAsStr).format());
                const timestampPreFormat =
                    newUserData[0].historical.portfolios[portfolio][0].timestamp;

                newUserData[0].historical.portfolios[portfolio][0].timestamp =
                    strToDatetime(timestampPreFormat);
                portfolioToPush[`historical.portfolios.${portfolio}`] = {
                    $each: [newUserData[0].historical.portfolios[portfolio][0]],
                    $position: 0,
                };
            });
            bulkRequests.push({
                updateOne: {
                    filter: { uid: newUserData[0].uid },
                    update: {
                        $push: portfolioToPush,
                        $set: {
                            'last_updated_snapshot.portfolios':
                                newUserData[0].historical.portfolios,
                        },
                    },
                },
            });
            await db.collection('users').bulkWrite(bulkRequests);
        };
        // const postToDb = async () => {
        //     const portfolioToPush = {};
        //     let bulkRequests = [];
        //     Object.keys(newUserData[0].historical.portfolios).forEach(portfolio => {
        //         const strToDatetime = timestampAsStr =>
        //             new Date(moment.utc(timestampAsStr).format());
        //         const timestampPreFormat =
        //             newUserData[0].historical.portfolios[portfolio][0].timestamp;

        //         newUserData[0].historical.portfolios[portfolio][0].timestamp =
        //             strToDatetime(timestampPreFormat);
        //         portfolioToPush[`historical.portfolios.${portfolio}`] = {
        //             $each: [newUserData[0].historical.portfolios[portfolio][0]],
        //             $position: 0,
        //         };
        //     });
        //     bulkRequests.push({
        //         updateOne: {
        //             filter: { uid: newUserData[0].uid },
        //             update: {
        //                 $push: portfolioToPush,
        //             },
        //         },
        //     });
        //     await db.collection('users').bulkWrite(bulkRequests);
        // };
        const updateUserStats = async () => {
            try {
                const userInfo = payload;
                const tokenList = createTokenListToUpdateUser(userInfo);
                const currentPrices = getCurrentPrices(tokenList);
                runCalcsAndUpdateUser(userInfo, await currentPrices);
                await postToDb();
                res.status(200).json({ message: 'success' });
            } catch (e) {
                res.status(400).json({ message: 'failure' });
                log(e);
            }
        };
        updateUserStats();
    } else {
        const data = JSON.parse(JSON.stringify({ message: 'failure' }));
        res.status(400).json(data);
    }
}
