import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import cookie from "cookie";

import clientPromise from "@utils/mongodb";

import TotalPageDiv from "@components/common/Divs/TotalPageDiv";
import NonNavDiv from "@components/common/Divs/NonNavDiv";
import Navbar from "@components/common/Navbar";
import Header from "@components/common/Header";
import TokenSection from "@components/tokens/TokenSection";
import UserSection from "@components/users/userSection";
import { error } from "@utils/console";
import { ObjectId } from "mongodb";
import { usePrivy } from "@privy-io/react-auth";
import { verifyPrivyToken } from "@utils/verifyPrivyToken";

// type QueryProps = {
//   user: any
// }

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
                <Navbar />
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
        const db = client.db(process.env.MONGODB_DB);

        const getSession = async () => {
            try {
                const parsedCookies = cookie.parse(context.req.headers.cookie || "");
                const privyToken = parsedCookies["privy-token"];
                const { valid, decoded, error } = await verifyPrivyToken(privyToken);
                let session = null;
                if (valid) {
                    const uid = decoded?.sub;
                    let res = await db
                        .collection("users")
                        .find({ uid }, { projection: { _id: 1 } })
                        .toArray();
                    let _id = res.length > 0 ? res[0]._id.toString() : null;
                    session = {
                        user: {
                            uid: decoded?.sub || "",
                            _id,
                        },
                    };
                }
                return session;
            } catch (e) {
                return null;
            }
        };

        const getUser = async () => {
            const _id = context.query.user;
            let output = await db.collection("users").findOne({ _id: new ObjectId(_id as string) });
            return JSON.parse(JSON.stringify(output));
        };

        const [user, session] = await Promise.all([getUser(), getSession()]);

        return {
            props: {
                isConnected: true,
                session,
                user: [user],
                // tokenMetadata,
                // tokenTimeseries
            },
        };
    } catch (e) {
        error(e);
        return {
            props: { isConnected: false },
        };
    }
};
