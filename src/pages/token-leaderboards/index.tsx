import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { getSession } from 'next-auth/react';

import clientPromise from '@utils/mongodb';

import TotalPageDiv from '@components/common/Divs/TotalPageDiv';
import NonNavDiv from '@components/common/Divs/NonNavDiv';
import Navbar from '@components/common/Navbar';
import Header from '@components/common/Header';
import TopTokenSection from '@components/token-leaderboards/TopTokenSection';
import { error } from '@utils/console';

const TokenLeaderboards: NextPage = props => {
    return (
        <>
            <Head>
                <title>Token Leaderboards</title>
            </Head>
            <TotalPageDiv>
                <Navbar />
                <NonNavDiv>
                    <Header props={props} />
                    <TopTokenSection props={props} />
                </NonNavDiv>
            </TotalPageDiv>
        </>
    );
};

export default TokenLeaderboards;

export const getServerSideProps: GetServerSideProps = async context => {
    try {
        const session = await getSession(context);
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);

        let topTokenSnapshot = await db.collection('token-top-snapshot').find({}).toArray();
        topTokenSnapshot = JSON.parse(JSON.stringify(topTokenSnapshot));

        return {
            props: { isConnected: true, session, topTokenSnapshot },
        };
    } catch (e) {
        error(e);
        return {
            props: { isConnected: false },
        };
    }
};
