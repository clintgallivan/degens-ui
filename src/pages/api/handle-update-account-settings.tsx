import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@utils/mongodb';

export type ResData = {
    message: string;
    status: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResData>) {
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
