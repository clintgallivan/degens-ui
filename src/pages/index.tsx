import type { NextPage, GetServerSideProps } from 'next';
import { useTokenContext } from '../context/tokenContext';
import Head from 'next/head';
import Image from 'next/image';
import clientPromise from '../utils/mongodb.tsx';

import Navbar from '../components/common/Navbar';
import Header from '../components/common/Header';
import FeatureSection from '../components/Home/FeatureSection';

const Home: NextPage = (props) => {
  console.log(props);
  const tokenContext = useTokenContext();
  console.log(tokenContext);
  return (
    <>
      <div className="row-flex-1">
        <Navbar />
        <div className="col-flex-1">
          <Header />
          <FeatureSection props={props} />
        </div>
      </div>
    </>
  );
};

export default Home;

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
