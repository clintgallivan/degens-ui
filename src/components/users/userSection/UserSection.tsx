import UserGeneral from '@components/users/components/UserGeneral';
import UserScoreAndStats from '../components/UserScoreAndStats';
import UserChart from '../components/UserCharts';
import RecentStats from '../components/RecentStats';
import PortfolioDistribution from '../components/PortfolioDistribution';
import styles from './UserSection.module.scss';
import { useState } from 'react';
import { Portfolio } from '@components/settings/portfolio/ProfileSection/PortfolioSection';

export default function UserSection({ props }: any) {
    const [portfolio, setPortfolio] = useState<Portfolio>('season_1');
    const [selectedTimestamp, setselectedTimestamp] = useState(
        props.user[0].last_updated_snapshot.portfolios?.[portfolio]?.[0]?.timestamp || undefined,
    );
    return props.user.length > 0 ? (
        <div className={styles.content_area}>
            <div className={styles.top_row}>
                <UserGeneral props={props} />
                <UserScoreAndStats props={props} />
            </div>
            <div className={styles.middle_row}>
                <UserChart
                    props={props}
                    portfolio={portfolio}
                    setPortfolio={setPortfolio}
                    selectedTimestamp={selectedTimestamp}
                    setselectedTimestamp={setselectedTimestamp}
                />
                <RecentStats props={props} />
            </div>
            {/* <PortfolioDistribution
                props={props}
                portfolio={portfolio}
                setPortfolio={setPortfolio}
                selectedTimestamp={selectedTimestamp}
                setselectedTimestamp={setselectedTimestamp}
            /> */}
        </div>
    ) : (
        <div className={styles.content_area}>
            <div className={styles.top_row}>
                <UserGeneral props={props} />
                {/* <UserScoreAndStats props={props} /> */}
            </div>
        </div>
    );
}
