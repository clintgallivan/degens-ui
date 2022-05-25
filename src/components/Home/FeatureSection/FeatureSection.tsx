import IntroSection from '../components/IntroSection';
import Card from '../../common/Card';
import StatTable from '../../common/StatTable';

export default function FeatureSection({ props }) {
  return (
    <>
      <div className="content-area">
        <IntroSection />
        <Card header="Top Token Charts">
          <StatTable props={props} />
        </Card>
        {/* <StatsSection /> */}
      </div>
    </>
  );
}
