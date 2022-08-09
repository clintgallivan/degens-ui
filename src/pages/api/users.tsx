import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@utils/mongodb';
import moment from 'moment-timezone';
import axios from 'axios';

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
    const localDate = new Date();
    const timestamp = moment.utc(localDate).format();
    const payload = req.body;
    const existingDocument = await db
      .collection('users')
      .find({ uid: payload['uid'] })
      .toArray();
    if (existingDocument.length != 0) {
      res
        .status(409)
        .json({ message: 'User already exists', body: existingDocument });
    } else {
      var params = new URLSearchParams();
      params.append('ids', payload['uid']);
      params.append('user.fields', 'description,url,username');
      var config = {
        method: 'get',
        baseURL: 'https://api.twitter.com/2/users',
        params,
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
        },
      };
      let twitterOutput = { username: '', description: '', url: '' };
      let twitterReq = await axios(config)
        .then(function (response) {
          const res = response.data;
          twitterOutput['username'] = res['data'][0]['username'];
          twitterOutput['description'] = res['data'][0]['description'];
          twitterOutput['url'] = res['data'][0]['url'];
          return;
        })
        .catch(function (error) {
          return error;
        });

      let doc = await db.collection('users').insertOne({
        date_created: timestamp,
        uid: payload['uid'],
        username: twitterOutput['username'],
        name: payload['name'],
        image: payload['image'],
        description: twitterOutput['description'],
        url: twitterOutput['url'],
      });

      res.status(201).json({
        message: `${payload['name']} was added to the database`,
        body: { username: twitterOutput['username'] },
      });
    }
  } else {
    let data = await db.collection('users').find({}).toArray();
    data = JSON.parse(JSON.stringify(data));
    res.status(200).json(data);
  }
}
