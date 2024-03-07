import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';

import clientPromise from '@utils/mongodb';

import TotalPageDiv from '@components/common/Divs/TotalPageDiv';
import NonNavDiv from '@components/common/Divs/NonNavDiv';
import Navbar from '@components/common/Navbar';
import Header from '@components/common/Header';
import AccountSection from '@components/settings/account/AccountSection';
import { Session } from 'next-auth';
import { User } from 'src/types/user';

export type AccountPageProps = {
    isConnected: boolean;
    session?: TwitterSession;
    user?: User;
};

type TwitterSession = {
    expires: Date;
    user: {
        name: string;
        image: URL;
        uid: string;
    };
};

const Account: NextPage<AccountPageProps> = props => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Account Settings</title>
            </Head>
            <TotalPageDiv>
                <Navbar />
                <NonNavDiv>
                    <Header props={props} />
                    <AccountSection props={props} />
                </NonNavDiv>
            </TotalPageDiv>
        </>
    );
};

export default Account;

export const getServerSideProps: GetServerSideProps = async context => {
    // const username = context.query.user;

    try {
        const session: any = await getSession(context);
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);

        const uid = session?.user?.uid || '';
        // const uid = session?.user?.uid || '';

        const getUser = async () => {
            const res = await db
                .collection('users')
                .find({ uid }, { projection: { historical: 0 } })
                .toArray();
            const parsedRes = JSON.parse(JSON.stringify(res));
            const user = parsedRes?.[0] || null;
            return user;
        };

        let [user] = await Promise.all([getUser()]);

        return {
            props: {
                isConnected: true,
                session,
                user,
            },
        };
    } catch (e) {
        console.error(e);
        return {
            props: { isConnected: false },
        };
    }
};
