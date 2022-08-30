import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';

import clientPromise from '@utils/mongodb';

import TotalPageDiv from '@components/common/Divs/TotalPageDiv';
import NonNavDiv from '@components/common/Divs/NonNavDiv';
import Navbar from '@components/common/Navbar';
import Header from '@components/common/Header';
import TokenSection from '@components/tokens/TokenSection';
import UserSection from '@components/users/userSection';

// type QueryProps = {
//   user: any
// }

const User: NextPage = (props: any) => {
  const router = useRouter();
  const { user } = router.query;

  return (
    <>
      <Head>
        <title>Degens | {user || 'Crypto'}</title>
      </Head>
      <TotalPageDiv>
        <Navbar />
        <NonNavDiv>
          <Header props={props} />
          <UserSection props={props} />
          {/* <TokenSection props={props} /> */}
        </NonNavDiv>
      </TotalPageDiv>
    </>
  );
};

export default User;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const username = context.query.user;

  try {
    const session = await getSession(context);
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const getUser = async () => {
      let output = await db.collection('users').find({ username }).toArray();
      return JSON.parse(JSON.stringify(output));
    };
    // console.log(getUser());
    // const getTokenTimeseries = async () => {
    //   let output = await db
    //     .collection('token-timeseries')
    //     .find({ coingecko_id: id })
    //     .toArray();
    //   return JSON.parse(JSON.stringify(output));
    // };

    // let [tokenMetadata, tokenTimeseries] = await Promise.all([
    //   getTokenMetadata(),
    //   getTokenTimeseries(),
    // ]);
    let [user] = await Promise.all([getUser()]);

    return {
      props: {
        isConnected: true,
        session,
        user,
        // tokenMetadata,
        // tokenTimeseries
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};
