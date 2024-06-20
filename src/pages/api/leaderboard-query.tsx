import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@utils/mongodb";
import moment from "moment-timezone";
import UseLeaderboardSorter from "@hooks/useLeaderboardSorter";
import cors from "cors";

type Data = {
    by_degen_score: object[];
    by_developer_score: object[];
    by_community_score: object[];
    by_liquidity_score: object[];
};

type FailureResponse = {
    message: string;
    status: string;
};

type RequestTypes = {
    categories?: any;
    platforms?: any;
    market_cap_rank?: any;
};

// Initialize cors middleware with options
const corsMiddleware = cors({
    origin: process.env.CLIENT_ORIGIN, // replace with your client's origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "x-auth-token"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result);
            }

            return resolve(result);
        });
    });
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | FailureResponse>
) {
    await runMiddleware(req, res, corsMiddleware);
    if (req.headers["x-auth-token"] !== process.env.NEXT_PUBLIC_SHARED_SECRET) {
        res.status(403).json({ message: "Unauthorized", status: "failure" });
        return;
    }

    let client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    if (req.method === "GET") {
        // console.log(req);
        if (JSON.stringify(req.query) !== "{}") {
            const arrTransformer = (item?: string | string[]) => {
                if (typeof item == "string") {
                    return [item];
                } else {
                    return item;
                }
            };

            const findObj: RequestTypes = {};
            const mapper = () => {
                const categoryQuery = arrTransformer(req.query["categories[]"]);
                const platformQuery = arrTransformer(req.query["platforms[]"]);
                const marketCapRangeQuery = arrTransformer(req.query["marketCapRange[]"]);

                if (categoryQuery != undefined) {
                    findObj["categories"] = {
                        $all: arrTransformer(req.query["categories[]"]),
                    };
                }
                if (platformQuery != undefined) {
                    findObj["platforms"] = {
                        $all: arrTransformer(req.query["platforms[]"]),
                    };
                }
                if (marketCapRangeQuery != undefined) {
                    if (marketCapRangeQuery[1] != "9999999" || marketCapRangeQuery[0] != "0") {
                        findObj["market_cap_rank"] = {
                            $gt: parseInt(req?.query?.["marketCapRange[]"]?.[0] || "0"),
                            $lt: parseInt(req?.query?.["marketCapRange[]"]?.[1] || ""),
                        };
                    }
                }
            };
            mapper();
            let data = await db.collection("token-metadata").find(findObj).toArray();
            data = JSON.parse(JSON.stringify(data));
            // useLeaderboardSorter(data);
            if (data.length > 0) {
                res.status(200).json(UseLeaderboardSorter(data));
            } else {
                res.status(200).json({
                    by_degen_score: [],
                    by_developer_score: [],
                    by_community_score: [],
                    by_liquidity_score: [],
                });
            }
        } else {
            let data: any = [];
            res.status(200).json(data);
        }
    } else {
        res.status(400).json({ message: "Invalid request method", status: "failure" });
    }
}
