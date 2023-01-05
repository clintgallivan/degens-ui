import Card from '@components/common/Card';
import TokenGeneral from '@components/tokens/components/TokenGeneral';
import UserGeneral from '@components/users/components/UserGeneral';
import UserScoreAndStats from '../components/UserScoreAndStats';
import UserChart from '../components/UserCharts';
import RecentStats from '../components/RecentStats';
import PortfolioDistribution from '../components/PortfolioDistribution';
import styles from './UserSection.module.scss';

import moment from 'moment-timezone';

export default function UserSection({ props }: any) { 
  return (
    <>
    {props.user.length > 0 ? (
      <div className={styles.content_area}>
        <div className={styles.top_row}>
          <UserGeneral props={props} />
          <UserScoreAndStats props={props} />
        </div>
        <div className={styles.middle_row}>
          <UserChart props={props} />
          <RecentStats props={props} />
        </div>
        <PortfolioDistribution props={props} />
      </div>
    ) : (
      <div className={styles.content_area}>
      <div className={styles.top_row}>
        <UserGeneral props={props} />
        {/* <UserScoreAndStats props={props} /> */}
      </div>
    </div>
    )}
    </>
  );
}
