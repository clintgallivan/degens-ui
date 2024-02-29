import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';

import clientPromise from '@utils/mongodb';

import TotalPageDiv from '@components/common/Divs/TotalPageDiv';
import NonNavDiv from '@components/common/Divs/NonNavDiv';
import Navbar from '@components/common/Navbar';
import Header from '@components/common/Header';
// import TokenSection from '@components/tokens/TokenSection';
// import UserSection from '@components/users/userSection';
import PortfolioSection from '@components/settings/portfolio/ProfileSection';
import { useEffect } from 'react';
import axios from 'axios';
import { log } from '@utils/console';

// type QueryProps = {
//   user: any
// }

const Portfolio: NextPage = (props: any) => {
    const router = useRouter();
    const { user } = router.query;
    const { portfolios } = props.user[0].historical;
    const lastUpdatedAt: any = new Date(
        props.user[0].last_updated_snapshot.portfolios.season_1[0].timestamp,
    );
    const refreshData = () => {
        router.replace(router.asPath);
    };

    useEffect(() => {
        props.session ? null : router.push('/');
    }, []);

    useEffect(() => {
        const now: any = new Date();
        const lastUpdatedAsDate: any = new Date(lastUpdatedAt);
        const fiveMin = 60 * 5 * 1000;
        const handleUpdateStats = async () => {
            console.log('start api');
            try {
                const historical: any = {
                    portfolios: {},
                };
                Object.keys(portfolios).forEach(portfolio => {
                    const pKey = portfolio;
                    const pValue = portfolios[portfolio];
                    historical.portfolios[pKey] = [pValue[0]];
                });
                console.log('second');
                const res = await axios.post(
                    '/api/handle-update-stats',
                    {
                        uid: props.user[0].uid,
                        portfolio_metadata: props.user[0].portfolio_metadata,
                        historical,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    },
                );
                console.log(res);
                res.status === 200 ? refreshData() : log('failed to update');
            } catch (e) {
                log(e);
            }
        };

        if (now - lastUpdatedAsDate > fiveMin) {
            console.log('updating');
            handleUpdateStats();
        }

        console.log('not updating');
    }, []);

    return (
        <>
            <Head>
                <title>Degens | {user || 'Crypto'}</title>
            </Head>
            <TotalPageDiv>
                <Navbar />
                <NonNavDiv>
                    <Header props={props} />
                    {props.session ? <PortfolioSection props={props} /> : null}
                    {/* <UserSection props={props} /> */}
                    {/* <TokenSection props={props} /> */}
                </NonNavDiv>
            </TotalPageDiv>
        </>
    );
};

export default Portfolio;

export const getServerSideProps: GetServerSideProps = async context => {
    const username = context.query.user;

    try {
        const session: any = await getSession(context);
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);
        // console.log({ session });
        const getUser = async () => {
            let output = await db.collection('users').find({ uid: session.user.uid }).toArray();
            return JSON.parse(JSON.stringify(output));
        };
        // console.log(getUser());
        // const getTokenTimeseries = async () => {
        //   let output = await db
        //     .collection('token-timeseries')
        //     .find({ coingecko_id: id })
        //     .toArray();
        //   return JSON.parse(JSON.stringify(output));
        // };

        // let [tokenMetadata, tokenTimeseries] = await Promise.all([
        //   getTokenMetadata(),
        //   getTokenTimeseries(),
        // ]);
        let [user] = await Promise.all([getUser()]);

        return {
            props: {
                isConnected: true,
                session,
                user,
                // tokenMetadata,
                // tokenTimeseries
            },
        };
    } catch (e) {
        console.error(e);
        return {
            props: { isConnected: false },
        };
    }
};
