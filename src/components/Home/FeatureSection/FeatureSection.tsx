import IntroSection from '@components/Home/components/IntroSection';
import Card from '@components/common/Card';
import StatTable from '@components/common/StatTable';
import RetroButton from '@components/common/RetroButton';
import styles from './FeatureSection.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function FeatureSection({ props }: any) {
    const router = useRouter();
    const LeaderboardsButton = () => {
        return (
            <div className={styles.leaderboards_button}>
                <Link href={'/token-leaderboards'}>
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
