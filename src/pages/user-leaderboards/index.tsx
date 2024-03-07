import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { getSession } from 'next-auth/react';

import clientPromise from '@utils/mongodb';

import TotalPageDiv from '@components/common/Divs/TotalPageDiv';
import NonNavDiv from '@components/common/Divs/NonNavDiv';
import Navbar from '@components/common/Navbar';
import Header from '@components/common/Header';
import UserLeaderboardsSection from '@components/user-leaderboards/UserLeaderboardsSection';
import { error } from '@utils/console';

const UserLeaderboards: NextPage = props => {
    return (
        <>
            <Head>
                <title>User Leaderboards</title>
            </Head>
            <TotalPageDiv>
                <Navbar />
                <NonNavDiv>
                    <Header props={props} />
                    <UserLeaderboardsSection props={props} />
                </NonNavDiv>
            </TotalPageDiv>
        </>
    );
};

export default UserLeaderboards;

export const getServerSideProps: GetServerSideProps = async context => {
    try {
        const session = await getSession(context);
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);

        const res = await db.collection('user-leaderboards-top-100').find({}).toArray();
        const parsedRes = JSON.parse(JSON.stringify(res));
        const topTokenSnapshot = parsedRes?.[0]?.top_100_users || null;

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
