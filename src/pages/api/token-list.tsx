// import type { NextApiRequest, NextApiResponse } from 'next';
// import clientPromise from '@utils/mongodb';
// import moment from 'moment-timezone';

// type Data = {
//   message: string;
//   body?: object;
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   let client = await clientPromise;
//   const db = client.db(process.env.MONGO_DB);

//   if (req.method === 'POST') {
//     const payload = req.body;
//     console.log(payload);
//     const existingDocuments = await db
//       .collection('token-list')
//       // .find({ coingecko_id: payload['coingecko_id'] })
//       .find({})
//       .toArray();
//     console.log(existingDocuments);

//     if (existingDocuments.length != 0) {
//       res
//         .status(200)
//         .json({ message: `${payload['coingecko_id']} was found!` });
//     } else {
//       res
//         .status(404)
//         .json({ message: `${payload['coingecko_id']} was not found.` });
//     }
//   } else {
//     let data = await db.collection('token-list').find({}).toArray();
//     data = JSON.parse(JSON.stringify(data));
//     res.status(200).json(data);
//   }
// }

import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@utils/mongodb';
import moment from 'moment-timezone';

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
    res.status(204).json({ message: 'Endpoint NA' });
  } else {
    let substr = req.query.string;
    console.log(substr);

    db.collection('substr-search').createIndex({ iterator: 2 }),
      { collation: { locale: 'en', strength: 1 } };
    let data = await db
      .collection('substr-search')
      .find({ iterator: { $regex: substr, $options: '$i' } })
      .toArray();

    data = JSON.parse(JSON.stringify(data));
    res.status(200).json(data);
  }
}
