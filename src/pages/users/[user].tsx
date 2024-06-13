import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import clientPromise from "@utils/mongodb";
import TotalPageDiv from "@components/common/Divs/TotalPageDiv";
import NonNavDiv from "@components/common/Divs/NonNavDiv";
import Navbar from "@components/common/Navbar";
import Header from "@components/common/Header";
import { error } from "@utils/console";
import { ObjectId } from "mongodb";
import getSession from "@utils/getSession";
import UserSection from "@components/users/v2/userSection";
import { database } from "@utils/config";
import { User } from "src/types/user";

const User: NextPage = function (props: any) {
    const router = useRouter();
    const { user } = router.query;
    const titleText = `Degens | ${user || "Crypto"}`;
    return (
        <>
            <Head>
                <title>{titleText}</title>
            </Head>
            <TotalPageDiv>
                <Navbar props={props} />
                <NonNavDiv>
                    <Header props={props} />
                    <UserSection props={props} />
                </NonNavDiv>
            </TotalPageDiv>
        </>
    );
};

export default User;

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const client = await clientPromise;
        const db = client.db(database);

        const getUser = async () => {
            const _id = context.query.user;
            let output: User = await db
                .collection("users")
                .findOne({ _id: new ObjectId(_id as string) });
            return JSON.parse(JSON.stringify(output));
        };

        const [user, session] = await Promise.all([getUser(), getSession(context)]);

        return {
            props: {
                isConnected: true,
                session,
                user,
            },
        };
    } catch (e) {
        error(e);
        return {
            props: { isConnected: false },
        };
    }
};
