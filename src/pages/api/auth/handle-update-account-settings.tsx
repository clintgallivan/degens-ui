import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@utils/mongodb';

type Data = {
    message: string;
    body?: object;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    // const client = await clientPromise;
    // const db = client.db(process.env.MONGODB_DB);
    // if (req.method === 'POST') {
    //     const payload = req.body;
    //     const user = await db.collection('users').findOne({ email: payload.email });
    //     if (!user) {
    //         res.status(404).json({ message: 'User not found' });
    //         return;
    //     }
    //     const updatedUser = await db
    //         .collection('users')
    //         .updateOne({ email: payload.email }, { $set: { 'links[link]': payload.link } });
    //     if (updatedUser.modifiedCount === 0) {
    //         res.status(500).json({ message: 'Failed to update user' });
    //     } else {
    //         res.status(200).json({ message: 'User updated successfully' });
    //     }
    // } else {
    //     let data = await db.collection('users').find({}).toArray();
    //     data = JSON.parse(JSON.stringify(data));
    //     res.status(200).json(data);
    // }
}
