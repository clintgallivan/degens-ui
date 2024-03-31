import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { getSession } from "next-auth/react";

import clientPromise from "@utils/mongodb";

import TotalPageDiv from "@components/common/Divs/TotalPageDiv";
import NonNavDiv from "@components/common/Divs/NonNavDiv";
import Navbar from "@components/common/Navbar";
import Header from "@components/common/Header";
import UserLeaderboardsSection from "@components/user-leaderboards/UserLeaderboardsSection";
import { error } from "@utils/console";
import { Session } from "src/types/session";
import { TopUsersSnapshot } from "src/types/topUsersSnapshot";

type UserLeaderboardsPageProps = {
    isConnected: boolean;
    session?: Session;
    topUsersSnapshot: TopUsersSnapshot;
};

const UserLeaderboards: NextPage<UserLeaderboardsPageProps> = (props) => {
    return (
        <>
            <Head>
                <title>User Leaderboards</title>
            </Head>
            <TotalPageDiv>
                <Navbar props={props} />
                <NonNavDiv>
                    <Header props={props} />
                    <UserLeaderboardsSection props={props} />
                </NonNavDiv>
            </TotalPageDiv>
        </>
    );
};

export default UserLeaderboards;

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
