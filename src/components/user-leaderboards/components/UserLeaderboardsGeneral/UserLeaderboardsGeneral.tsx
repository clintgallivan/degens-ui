import styles from './UserLeaderboardsGeneral.module.scss';

export default function UserLeaderboardsGeneral({ props }: any) {
    const headerText = 'Leaderboard';

    return (
        <div className={styles.container}>
            <div className={styles.text_column}>
                <p className="fs-xxl fw-xxb">{headerText}</p>
                <p className="fs-xsm fw-b">
                    The top degens ranked by degen score in the degen community.
                </p>
            </div>
        </div>
    );
}
