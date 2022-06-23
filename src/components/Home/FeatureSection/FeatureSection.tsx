import IntroSection from '@components/Home/components/IntroSection';
import Card from '@components/common/Card';
import StatTable from '@components/common/StatTable';
import RetroButton from '@components/common/RetroButton';
import styles from './FeatureSection.module.scss';
import Link from 'next/link';

export default function FeatureSection({ props }: any) {
  const LeaderboardsButton = () => {
    return (
      <div className={styles.leaderboards_button}>
        <Link href={'token-leaderboards'}>
          <RetroButton>
            <div className={styles.leaderboards_button_text}>
              View Leaderboards
            </div>
          </RetroButton>
        </Link>
      </div>
    );
  };

  return (
    <>
      <div className="content-area">
        <IntroSection />
        <Card header="Top Token Charts">
          <StatTable props={props} />

          <LeaderboardsButton />
        </Card>
        {/* <StatsSection /> */}
      </div>
    </>
  );
}
