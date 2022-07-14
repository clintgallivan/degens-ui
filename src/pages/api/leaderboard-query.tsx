import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@utils/mongodb';
import moment from 'moment-timezone';
import UseLeaderboardSorter from '@hooks/useLeaderboardSorter';

type Data = {
  by_degen_score: object[];
  by_developer_score: object[];
  by_community_score: object[];
  by_liquidity_score: object[];
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
      const arrTransformer = (item: string | string[]) => {
        if (typeof item == 'string') {
          return [item];
        } else {
          return item;
        }
      };

      const findObj: RequestTypes = {};
      const mapper = () => {
        const categoryQuery = arrTransformer(req.query['categories[]']);
        const platformQuery = arrTransformer(req.query['platforms[]']);
        const marketCapRangeQuery = arrTransformer(
          req.query['marketCapRange[]']
        );

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
        if (marketCapRangeQuery != undefined) {
          if (
            marketCapRangeQuery[1] != '9999999' ||
            marketCapRangeQuery[0] != '0'
          ) {
            findObj['market_cap_rank'] = {
              $gt: parseInt(req.query['marketCapRange[]'][0]),
              $lt: parseInt(req.query['marketCapRange[]'][1]),
            };
          }
        }
      };
      mapper();
      let data = await db.collection('token-metadata').find(findObj).toArray();
      data = JSON.parse(JSON.stringify(data));
      // useLeaderboardSorter(data);
      if (data.length > 0) {
        res.status(200).json(UseLeaderboardSorter(data));
      } else {
        res.status(200).json({
          by_degen_score: [],
          by_developer_score: [],
          by_community_score: [],
          by_liquidity_score: [],
        });
      }
    } else {
      let data: any = [];
      res.status(200).json(data);
    }
  }
}
