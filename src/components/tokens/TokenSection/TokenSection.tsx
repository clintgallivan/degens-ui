import Card from '@components/common/Card';
import TokenGeneral from '@components/tokens/components/TokenGeneral';
import TokenRanks from '@components/tokens/components/TokenRanks';
import TokenChart from '../components/TokenCharts';

export default function TokenSection({ props }) {
  return (
    <>
      <div className="content-area">
        <TokenGeneral props={props} />
        <TokenRanks props={props} />
        <TokenChart props={props} />
      </div>
    </>
  );
}
