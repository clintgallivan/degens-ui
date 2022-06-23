import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';

import clientPromise from '@utils/mongodb';

import TotalPageDiv from '@components/common/Divs/TotalPageDiv';
import NonNavDiv from '@components/common/Divs/NonNavDiv';
import Navbar from '@components/common/Navbar';
import Header from '@components/common/Header';
import TopTokenSection from '@components/token-leaderboards/TopTokenSection';

const TokenLeaderboards: NextPage = (props) => {
  return (
    <>
      <TotalPageDiv>
        <Navbar />
        <NonNavDiv>
          <Header />
          <TopTokenSection props={props} />
        </NonNavDiv>
      </TotalPageDiv>
    </>
  );
};

export default TokenLeaderboards;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    let topTokenSnapshot = await db
      .collection('token-top-snapshot')
      .find({})
      .toArray();
    topTokenSnapshot = JSON.parse(JSON.stringify(topTokenSnapshot));

    return {
      props: { isConnected: true, topTokenSnapshot },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};
