import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@utils/mongodb';
import moment from 'moment-timezone';

type Data = {
    message: string;
    body?: object;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    if (req.method === 'POST') {
        const localDate = new Date();
        const timestamp = moment.utc(localDate).format();
        const payload = req.body;
        const existingDocument = await db
            .collection('emails')
            .find({ email: payload.email })
            .toArray();
        if (existingDocument.length != 0) {
            res.status(409).json({ message: 'Token already exists', body: existingDocument });
        } else {
            const doc = await db
                .collection('emails')
                .insertOne({ email: payload.email, timestamp });
            res.status(201).json({ message: `${payload.email} was added to the database` });
        }
    } else {
        let data = await db.collection('emails').find({}).toArray();
        data = JSON.parse(JSON.stringify(data));
        res.status(200).json(data);
    }
}
