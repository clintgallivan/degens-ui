import type { NextPage } from 'next';
import { useTokenContext } from '@context/tokenContext';
import { useLayoutContext } from '@context/layoutContext';

import Navbar from '@components/common/Navbar';
import Header from '@components/common/Header';
import TopTokenSection from '@components/token-leaderboards/TopTokenSection';

import { GetServerSideProps } from 'next';
import clientPromise from '@utils/mongodb';

const TokenLeaderboards: NextPage = (props) => {
  const { navIsExpanded, setNavIsExpanded } = useLayoutContext();
  return (
    <>
      <div className="row-flex-1">
        <Navbar />
        <div
          className="col-flex-1"
          onClick={() => (navIsExpanded ? setNavIsExpanded(false) : null)}
        >
          <Header />
          <TopTokenSection props={props} />
        </div>
      </div>
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
