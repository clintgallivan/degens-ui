import cookie from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";
import cors from "cors";
import { verifyPrivyToken } from "@utils/verifyPrivyToken";
import { log } from "@utils/console";

interface VerifySessionRequest extends NextApiRequest {
    body: {
      privyToken: string;
    };
  }

type Data = {
    sessionValid?: boolean;
    expiresAt?: string;
    message?: string;
    status?: string;
};

const corsMiddleware = cors({
    origin: process.env.CLIENT_ORIGIN, // replace with your client's origin
    methods: ["POST"],
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

export default async function handler(req: VerifySessionRequest, res: NextApiResponse<Data>) {
    await runMiddleware(req, res, corsMiddleware);
    if (req.headers["x-auth-token"] !== process.env.NEXT_PUBLIC_SHARED_SECRET) {
        res.status(403).json({ message: "Unauthorized", status: "failed" });
        return;
    }
    if (req.method === "POST") {
        try {
            const payload = req.body;
            const privyToken = payload?.privyToken || ''
            const { valid, decoded, error } = await verifyPrivyToken(privyToken);
            const expiresAt = decoded?.exp ? new Date(decoded?.exp * 1000).toISOString() : undefined;
            res.status(200).json({ sessionValid: valid, expiresAt});
        } catch (e) {
            log(e);
            res.status(400).json({ message: "Something went wrong", status: "failure" });
        }
    }
}
