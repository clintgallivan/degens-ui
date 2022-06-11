import IntroSection from '@components/home/components/IntroSection';
import Card from '@components/common/Card';
import TopTokenTable from '@components/common/TopTokenTable';

export default function TopTokenSection({ props }: any) {
  // console.log(props.topTokenSnapshot);
  return (
    <>
      <div className="content-area">
        {/* <IntroSection /> */}
        <Card header="Top Token Charts">
          <TopTokenTable props={props} />
        </Card>
        {/* <StatsSection /> */}
      </div>
    </>
  );
}
