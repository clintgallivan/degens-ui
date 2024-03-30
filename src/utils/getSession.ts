import cookie from "cookie";
import clientPromise from "./mongodb";
import { verifyPrivyToken } from "./verifyPrivyToken";
import { GetServerSidePropsContext } from "next";
import { useWallets } from "@privy-io/react-auth";
const getSession = async (context: GetServerSidePropsContext) => {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    try {
        const parsedCookies = cookie.parse(context.req.headers.cookie || "");
        const privyToken = parsedCookies["privy-token"];
        let session = null;
        const { valid, decoded, error } = await verifyPrivyToken(privyToken);
        if (error) {
            return null;
        }
        const initUser = async () => {
            let user = null
            if (valid) {
                const uid = decoded?.sub;
                let res = await db
                    .collection("users")
                    .find(
                        { uid },
                        {
                            projection: {
                                date_created: 1,
                                uid: 1,
                                username: 1,
                                name: 1,
                                image: 1,
                                image_hi_res: 1,
                                description: 1,
                                links: 1,
                            },
                        }
                    )
                    .toArray();
                user = res.length > 0 ? res[0] : null;
    
                const unixDateCreated = user.date_created.getTime()
                return user = { ...user, _id: user._id.toString(), date_created: unixDateCreated }
            }
            else {
                return user
            }
        }
        // const initWallets = async () => {
        //     let wallets = null
        //     if (valid) {
        //         // const uid = decoded?.sub;
        //         // let res = await db
        //         //     .collection("wallets")
        //         //     .find(
        //         //         { uid },
        //         //         {
        //         //             projection: {
        //         //                 _id: 1,
        //         //                 uid: 1,
        //         //                 name: 1,
        //         //                 address: 1,
        //         //                 network: 1,
        //         //                 balance: 1,
        //         //                 balance_usd: 1,
        //         //             },
        //         //         }
        //         //     )
        //         //     .toArray();
        //         // wallets = res.length > 0 ? res : null;
        //         // return wallets
        //     }
        //     else {
        //         return wallets
        //     }
        // }
        const [user] = await Promise.all([initUser()]);
        session = { user };
        return session;
    } catch (e) {
        return null;
    }
};

export default getSession