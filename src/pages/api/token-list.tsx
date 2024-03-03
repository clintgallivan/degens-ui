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
        res.status(204).json({ message: 'Endpoint NA' });
    } else {
        const substr = req.query.string;

        db.collection('substr-search').createIndex({ iterator: 2 }),
            { collation: { locale: 'en', strength: 1 } };
        let data = await db
            .collection('substr-search')
            .find({ iterator: { $regex: substr, $options: 'i' } })
            .toArray();

        data = JSON.parse(JSON.stringify(data));
        res.status(200).json(data);
    }
}
