import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@utils/mongodb';
import cors from 'cors';

export type ResData = {
    message: string;
    status: string;
};

// Initialize cors middleware with options
const corsMiddleware = cors({
    origin: process.env.CLIENT_ORIGIN, // replace with your client's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Add 'OPTIONS' to the list of methods
    allowedHeaders: ['Content-Type', 'x-auth-token'],
    credentials: true, // Enable cookies to be sent with requests
    preflightContinue: false, // Respond to preflight requests with a status of 204
    optionsSuccessStatus: 204,
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

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResData>) {
    await runMiddleware(req, res, corsMiddleware);
    if (req.headers['x-auth-token'] !== process.env.NEXT_PUBLIC_SHARED_SECRET) {
        res.status(403).json({ message: 'Unauthorized', status: 'failed' });
        return;
    }
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    if (req.method === 'POST') {
        const payload = req.body;
        const user = await db.collection('users').findOne({ uid: payload.uid });
        if (!user) {
            res.status(404).json({ message: 'User not found', status: 'failed' });
            return;
        }
        const updatedUser = await db.collection('users').updateOne(
            { uid: payload.uid },
            {
                $set: {
                    description: payload.bio,
                    'links.instagram_link': payload.instagramLink,
                    'links.youtube_link': payload.youtubeLink,
                    'links.tik_tok_link': payload.tiktokLink,
                    'links.reddit_link': payload.redditLink,
                    'links.bio_link_1': payload.otherLink,
                },
            },
        );
        if (updatedUser.modifiedCount === 0) {
            res.status(500).json({ message: 'Failed to update user', status: 'failed' });
            return;
        }
        res.status(200).json({ message: 'User updated successfully', status: 'success' });
    } else {
        res.status(400).json({ message: 'Invalid request method', status: 'failed' });
    }
}
