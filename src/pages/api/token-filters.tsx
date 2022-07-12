import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@utils/mongodb';

type Data = {
  message: string;
  body?: object;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  if (req.method === 'POST') {
    res.status(404);
  } else {
    let data = await db.collection('token-filters').find({}).toArray();
    data = JSON.parse(JSON.stringify(data));
    res.status(200).json(data);
  }
}
