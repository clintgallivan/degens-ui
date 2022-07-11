import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@utils/mongodb';
import moment from 'moment-timezone';

type Data = {
  message: string;
  body?: object;
};

type RequestTypes = {
  categories?: any;
  platforms?: any;
  market_cap_rank?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  if (req.method === 'POST') {
    const localDate = new Date();
  } else {
    if (JSON.stringify(req.query) !== '{}') {
      const arrTransformer = (item) => {
        if (typeof item == 'string') {
          return [item];
        } else {
          return item;
        }
      };
      // console.log(req.query['marketCapRange[]']);

      const findObj: RequestTypes = {};
      const mapper = () => {
        const categoryQuery = arrTransformer(req.query['categories[]']);
        const platformQuery = arrTransformer(req.query['platforms[]']);
        const marketCapRangeQuery = arrTransformer(
          req.query['marketCapRange[]']
        );
        // console.log(marketCapRangeQuery[0]));

        if (categoryQuery != undefined) {
          findObj['categories'] = {
            $all: arrTransformer(req.query['categories[]']),
          };
        }
        if (platformQuery != undefined) {
          findObj['platforms'] = {
            $all: arrTransformer(req.query['platforms[]']),
          };
        }
        if (
          marketCapRangeQuery[1] != '9999999' ||
          marketCapRangeQuery[0] != '0'
        ) {
          findObj['market_cap_rank'] = {
            $gt: parseInt(req.query['marketCapRange[]'][0]),
            $lt: parseInt(req.query['marketCapRange[]'][1]),
          };
        }
      };
      mapper();
      let data = await db.collection('token-metadata').find(findObj).toArray();
      data = JSON.parse(JSON.stringify(data));
      if (data.length > 0) {
        res.status(200).json(data);
      } else {
        res.status(204).json(data);
      }
    } else {
      let data: any = [];
      res.status(200).json(data);
    }
  }
}
