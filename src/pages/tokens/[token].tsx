import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useTokenContext } from '@context/tokenContext';
import { useLayoutContext } from '@context/layoutContext';
import { GetServerSideProps } from 'next';
import clientPromise from '@utils/mongodb';

import Navbar from '@components/common/Navbar';
import Header from '@components/common/Header';
import TokenSection from '@components/tokens/TokenSection';

const Token: NextPage = (props) => {
  const router = useRouter();
  const { token } = router.query;
  // console.log(props);

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
          <TokenSection props={props} />
        </div>
      </div>
    </>
  );
};

export default Token;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.token;
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const getTokenMetadata = async () => {
      let output = await db
        .collection('token-metadata')
        .find({ coingecko_id: id })
        .toArray();
      return JSON.parse(JSON.stringify(output));
    };
    const getTokenTimeseries = async () => {
      let output = await db
        .collection('token-timeseries-2')
        .find({ coingecko_id: id })
        .toArray();
      return JSON.parse(JSON.stringify(output));
    };

    let [tokenMetadata, tokenTimeseries] = await Promise.all([
      getTokenMetadata(),
      getTokenTimeseries(),
    ]);

    return {
      props: { isConnected: true, tokenMetadata, tokenTimeseries },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};
