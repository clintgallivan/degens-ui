import type { NextPage } from 'next';
import { useTokenContext } from '@context/tokenContext';
import { useLayoutContext } from '@context/layoutContext';

import Navbar from '@components/common/Navbar';
import Header from '@components/common/Header';
import TopTokenSection from '@components/token-leaderboards/TopTokenSection';

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
