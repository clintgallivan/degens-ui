import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { getSession } from 'next-auth/react';

import clientPromise from '@utils/mongodb';

import Navbar from '@components/common/Navbar';
import Header from '@components/common/Header';
import FeatureSection from '@components/Home/FeatureSection';
import TotalPageDiv from '@components/common/Divs/TotalPageDiv';
import NonNavDiv from '@components/common/Divs/NonNavDiv/NonNavDiv';
import { error } from '@utils/console';

type HomePageProps = {
    session?: {
        expires: Date;
        user: {
            name: string;
            image: URL;
            uid: string;
        };
    };
};

const Home: NextPage<HomePageProps> = props => {
    return (
        <>
            <Head>
                <title>Degen Analytics | Crypto</title>
            </Head>
            <TotalPageDiv>
                <Navbar />
                <NonNavDiv>
                    <Header props={props} />
                    <FeatureSection props={props} />
                </NonNavDiv>
            </TotalPageDiv>
        </>
    );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async context => {
    try {
        const session = await getSession(context);
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);

        const res = await db.collection('user-leaderboards-top-100').find({}).toArray();
        const parsedRes = JSON.parse(JSON.stringify(res));
        const topTokenSnapshot = parsedRes?.[0]?.top_100_users || null;
        // let topTokenSnapshot = await db.collection('token-top-snapshot').find({}).toArray();
        // topTokenSnapshot = JSON.parse(JSON.stringify(topTokenSnapshot));

        return {
            props: {
                isConnected: true,
                session,
                topTokenSnapshot,
                // topTokenSnapshot,
            },
        };
    } catch (e) {
        error(e);
        return {
            props: { isConnected: false },
        };
    }
};
