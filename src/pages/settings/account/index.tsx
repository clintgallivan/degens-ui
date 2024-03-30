import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import TotalPageDiv from "@components/common/Divs/TotalPageDiv";
import NonNavDiv from "@components/common/Divs/NonNavDiv";
import Navbar from "@components/common/Navbar";
import Header from "@components/common/Header";
import AccountSection from "@components/settings/account/AccountSection";
import { error } from "@utils/console";
import getSession from "@utils/getSession";
import { Session } from "src/types/session";

export type AccountPageProps = {
    isConnected: boolean;
    session?: Session;
};

const Account: NextPage<AccountPageProps> = (props) => {
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

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const [session] = await Promise.all([getSession(context)]);

        return {
            props: {
                isConnected: true,
                session,
            },
        };
    } catch (e) {
        error(e);
        return {
            props: { isConnected: false },
        };
    }
};
