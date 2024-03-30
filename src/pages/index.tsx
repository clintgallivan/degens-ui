import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";

import clientPromise from "@utils/mongodb";

import Navbar from "@components/common/Navbar";
import Header from "@components/common/Header";
import FeatureSection from "@components/Home/FeatureSection";
import TotalPageDiv from "@components/common/Divs/TotalPageDiv";
import NonNavDiv from "@components/common/Divs/NonNavDiv/NonNavDiv";
import { error } from "@utils/console";
import getSession from "@utils/getSession";
import { Session } from "src/types/session";
import { TopUsersSnapshot } from "src/types/topUsersSnapshot";

type HomePageProps = {
    isConnected: boolean;
    session?: Session;
    topUsersSnapshot: TopUsersSnapshot;
};

const Home: NextPage<HomePageProps> = (props) => {
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

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);

        const getTopUsersSnapshot = async () => {
            const res = await db.collection("user-leaderboards-top-100").find({}).toArray();
            const parsedRes = JSON.parse(JSON.stringify(res));
            return parsedRes?.[0]?.top_100_users || null;
        };

        const [topUsersSnapshot, session] = await Promise.all([
            getTopUsersSnapshot(),
            getSession(context),
        ]);
        return {
            props: {
                isConnected: true,
                session,
                topUsersSnapshot,
            },
        };
    } catch (e) {
        error(e);
        return {
            props: { isConnected: false },
        };
    }
};
