import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import Navbar from '../components/common/Navbar';
import Header from '../components/common/Header';
import FeatureSection from '../components/Home/FeatureSection';

const Home: NextPage = () => {
  return (
    <>
      <div className="row-flex-1">
        <Navbar />
        <div className="col-flex-1">
          <Header />
          <FeatureSection />
        </div>
      </div>
    </>
  );
};

export default Home;
