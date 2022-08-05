import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { signIn, signOut, useSession, getSession } from 'next-auth/react';

import clientPromise from '@utils/mongodb';

import Navbar from '@components/common/Navbar';
import Header from '@components/common/Header';
import FeatureSection from '@components/Home/FeatureSection';
import TotalPageDiv from '@components/common/Divs/TotalPageDiv';
import NonNavDiv from '@components/common/Divs/NonNavDiv/NonNavDiv';
import { useEffect } from 'react';

type HomePageProps = {
  session?: {
    expires: Date;
    user: {
      name: string;
      image: URL;
      uid: string;
    };
  };
};

const Home: NextPage<HomePageProps> = (props) => {
  const session = props.session;

  useEffect(() => {
    session ? console.log('yes') : console.log('no');
  }, []);

  return (
    <>
      <Head>
        <title>Degen Analytics | Crypto</title>
      </Head>
      <TotalPageDiv>
        <Navbar />
        <NonNavDiv>
          <Header props={props} />
          <FeatureSection props={props} />
          {!session && (
            <>
              Not signed in <br />
              <button onClick={() => signIn()}>Sign in</button>
            </>
          )}
          {session && (
            <>
              Signed in as {session.user.name} <br />
              <button onClick={() => signOut()}>Sign out</button>
            </>
          )}
        </NonNavDiv>
      </TotalPageDiv>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const session = await getSession(context);
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    let topTokenSnapshot = await db
      .collection('token-top-snapshot')
      .find({})
      .toArray();
    topTokenSnapshot = JSON.parse(JSON.stringify(topTokenSnapshot));

    return {
      props: { isConnected: true, topTokenSnapshot, session },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};
