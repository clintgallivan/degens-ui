import IntroSection from '@components/home/components/IntroSection';
import Card from '@components/common/Card';
import StatTable from '@components/common/StatTable';

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
