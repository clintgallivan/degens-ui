import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@utils/mongodb";
import cors from "cors";

type Data = {
    message: string;
    body?: object;
    status?: string;
};

const corsMiddleware = cors({
    origin: process.env.CLIENT_ORIGIN, // replace with your client's origin
    methods: ["GET"],
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
    const db = client.db(process.env.MONGODB_DB);

    if (req.method === "GET") {
        let data = await db.collection("system-info").findOne({});
        res.status(200).json(data);
    } else {
        res.status(400).json({ message: "Invalid request method", status: "failed" });
    }
}
