import cookie from "cookie";
import clientPromise from "./mongodb";
import { verifyPrivyToken } from "./verifyPrivyToken";
import { GetServerSidePropsContext } from "next";
const getSession = async (context: GetServerSidePropsContext) => {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    try {
        const parsedCookies = cookie.parse(context.req.headers.cookie || "");
        const privyToken = parsedCookies["privy-token"];
        const { valid, decoded, error } = await verifyPrivyToken(privyToken);
        
        let session = null;
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
            let user = res.length > 0 ? res[0] : null;

            const unixDateCreated = user.date_created.getTime()
            session = {
                user: { ...user, _id: user._id.toString(), date_created: unixDateCreated },
            };
        }
        return session;
    } catch (e) {
        return null;
    }
};

export default getSession