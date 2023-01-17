import Badge from '@components/common/Badge';
import Card from '@components/common/Card';
import RetroButton from '@components/common/RetroButton';
import UseScoreLabelGenerator from '@hooks/useScoreLabelGenerator';
import { log } from '@utils/console';
import { toFixedNumber } from '@utils/text';
import axios from 'axios';
// import handleUpdateStats from 'src/pages/api/handleUpdateStats';
import ProgressBar from './ProgressBar/ProgressBar';
import styles from './UserScoreAndStats.module.scss';

export default function UserScoreAndStats({ props }: any) {
    const { score } = props.user[0].last_updated_snapshot.portfolios.season_1[0];
    const { portfolios } = props.user[0].historical;
    const { currentLabel, nextThreshold } = UseScoreLabelGenerator(score);
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
            res.status === 200 ? log('stats updated') : log('failed to update');
        } catch (e) {
            log(e);
        }
    };
    return (
        <div className={styles.container}>
            <div className={styles.update_button_aura}>
                <RetroButton variant="dark_purple" onClick={() => handleUpdateStats()}>
                    <div className={styles.update_button_text}>Update Stats</div>
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
