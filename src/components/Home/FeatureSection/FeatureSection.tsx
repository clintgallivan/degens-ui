import IntroSection from '@components/Home/components/IntroSection';
import Card from '@components/common/Card';
import StatTable from '@components/common/StatTable';
import RetroButton from '@components/common/RetroButton';
import styles from './FeatureSection.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import UserLeaderboardsTable from '@components/user-leaderboards/components/UserLeaderboardsTable';

export default function FeatureSection({ props }: any) {
    const router = useRouter();
    // * This would route to the token leaderboards page
    // const LeaderboardsButton = () => {
    //     return (
    //         <div className={styles.leaderboards_button}>
    //             <Link href={'/token-leaderboards'}>
    //                 <a className={styles.a_tag}>
    //                     <RetroButton>
    //                         <div className={styles.leaderboards_button_text}>View Leaderboards</div>
    //                     </RetroButton>
    //                 </a>
    //             </Link>
    //         </div>
    //     );
    // };
    const UserLeaderboardsButton = () => {
        return (
            <div className={styles.leaderboards_button}>
                <Link href={'/user-leaderboards'}>
                    <a className={styles.a_tag}>
                        <RetroButton>
                            <div className={styles.leaderboards_button_text}>View Leaderboards</div>
                        </RetroButton>
                    </a>
                </Link>
            </div>
        );
    };

    return (
        <>
            <div className="content-area">
                <IntroSection props={props} />
                <Card>
                    <div className={styles.table_header_text}>
                        <p className="fs-xxl fw-xxb">Top Degens</p>
                    </div>
                    <UserLeaderboardsTable count={10} props={props} />
                    <UserLeaderboardsButton />

                    {/* <StatTable props={props} /> */}
                    {/* <LeaderboardsButton /> */}
                </Card>
                {/* <StatsSection /> */}
            </div>
        </>
    );
}
