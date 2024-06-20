import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@utils/mongodb";
// import moment from 'moment-timezone';
import cors from "cors";
import { UserSession } from "src/types/session";
import { database } from "@utils/config";

type Data = {
    message: string;
    body?: object;
    status?: string;
};

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

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    await runMiddleware(req, res, corsMiddleware);
    if (req.headers["x-auth-token"] !== process.env.NEXT_PUBLIC_SHARED_SECRET) {
        res.status(403).json({ message: "Unauthorized", status: "failed" });
        return;
    }

    const client = await clientPromise;

    const db = client.db(database);

    if (req.method === "POST") {
        const localDate = Date.now();

        const payload = req.body;
        const existingDocument: UserSession[] = await db
            .collection("users")
            .find(
                { uid: payload.uid },
                {
                    projection: {
                        created_at: 1,
                        uid: 1,
                        username: 1,
                        name: 1,
                        image: 1,
                        description: 1,
                        links: 1,
                    },
                }
            )
            .toArray();
        if (existingDocument.length != 0) {
            res.status(409).json({ message: "User already exists", body: existingDocument[0] });
        } else {
            const params = new URLSearchParams();
            params.append("ids", payload.uid);
            params.append("user.fields", "description,url,username");

            await db.collection("users").insertOne({
                created_at: localDate,
                uid: payload.uid,
                username: null,
                name: null,
                description: null,
                image: null,
                wallets: [],
                links: {
                    bio_link_1: null,
                    twitter_link: null,
                    discord_link: null,
                    youtube_link: null,
                    telegram_link: null,
                    instagram_link: null,
                    tik_tok_link: null,
                    reddit_link: null,
                },
                verifications: {
                    twitter: false,
                },
            });

            const res1: UserSession[] = await db
                .collection("users")
                .find(
                    { uid: payload.uid },
                    {
                        projection: {
                            created_at: 1,
                            uid: 1,
                            username: 1,
                            name: 1,
                            image: 1,
                            description: 1,
                            links: 1,
                        },
                    }
                )
                .toArray();

            res.status(201).json({
                message: `${payload.name} was added to the database`,
                body: res1[0],
            });
        }
    } else if (req.method === "GET") {
        let data = await db.collection("users").find({}).toArray();
        res.status(200).json(data);
    } else {
        res.status(400).json({ message: "Invalid request method", status: "failed" });
    }
}
