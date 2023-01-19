import Badge from '@components/common/Badge';
import Card from '@components/common/Card';
import RetroButton from '@components/common/RetroButton';
import UseScoreLabelGenerator from '@hooks/useScoreLabelGenerator';
import { log } from '@utils/console';
import { toFixedNumber } from '@utils/text';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// import handleUpdateStats from 'src/pages/api/handleUpdateStats';
import ProgressBar from './ProgressBar/ProgressBar';
import styles from './UserScoreAndStats.module.scss';

export default function UserScoreAndStats({ props }: any) {
    const router = useRouter();
    const { score } = props.user[0].last_updated_snapshot.portfolios.season_1[0];
    const { portfolios } = props.user[0].historical;
    const prevLastUpdatedAtStats = props.user[0].last_updated_snapshot.portfolios.season_1[0];
    const lastUpdatedAt = props.user[0].last_updated_snapshot.portfolios.season_1[0].timestamp;
    const { currentLabel, nextThreshold } = UseScoreLabelGenerator(score);
    const [updateButtonDisabled, setUpdateButtonDisabled] = useState(true);
    const updateButtonDisabledHandler = () => {
        const hour = 60 * 60 * 1000;
        if (new Date() - new Date(lastUpdatedAt) > hour) {
            setUpdateButtonDisabled(false);
        } else {
            setUpdateButtonDisabled(true);
        }
    };
    const refreshData = () => {
        router.replace(router.asPath);
    };
    const handleUpdateStats = async () => {
        try {
            const historical = {
                portfolios: {},
            };
            Object.keys(portfolios).forEach(portfolio => {
                const pKey = portfolio;
                const pValue = portfolios[portfolio];
                historical.portfolios[pKey] = [pValue[0]];
            });

            const res = await axios.post(
                '/api/handle-update-stats',
                {
                    uid: props.user[0].uid,
                    portfolio_metadata: props.user[0].portfolio_metadata,
                    historical,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );
            res.status === 200 ? refreshData() : log('failed to update');
        } catch (e) {
            log(e);
        }
    };

    useEffect(() => {
        updateButtonDisabledHandler();
    }, [refreshData]);
    useEffect(() => {
        updateButtonDisabledHandler();
    }, []);
    return (
        <div className={styles.container}>
            <div className={updateButtonDisabled ? null : styles.update_button_aura}>
                <RetroButton
                    variant="dark_purple"
                    onClick={() => handleUpdateStats()}
                    disabled={updateButtonDisabled}
                >
                    <div className={styles.update_button_text}>
                        {updateButtonDisabled ? 'Updated Recently' : 'Update Stats'}
                    </div>
                </RetroButton>
            </div>
            <div className={styles.title}>{currentLabel}</div>
            <div className={styles.score_and_next_tier_row}>
                <div className={styles.score_text}>{score.toFixed(2)}</div>
            </div>
            <ProgressBar props={props} />
        </div>
    );
}