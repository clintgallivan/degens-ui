import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@utils/mongodb";
import cors from "cors";
import { UserSession } from "src/types/session";
import { database } from "@utils/config";
import { loginNodeCoreApi } from "src/api/auth";
import { toAxiosError } from "@utils/api";
import { log } from "console";

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

    if (req.method === "POST") {
        try {
            const username = process.env.DEGENS_CORE_API_NODE_USERNAME || '';
            const password = process.env.DEGENS_CORE_API_NODE_PASSWORD || '';
            const loginRes = await loginNodeCoreApi({ username, password });
            const accessToken = loginRes.data.accessToken;
            res.status(200).json({ message: "Authentication successful", body: { accessToken }, status: "success" });
        } catch (error) {
            log(error)
            res.status(402).json({ message: "Authentication failed", status: "failed"});
        }

    } else {
        res.status(400).json({ message: "Invalid request method", status: "failed" });
    }
}
