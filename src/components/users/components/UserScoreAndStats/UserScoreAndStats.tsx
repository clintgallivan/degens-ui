import Badge from '@components/common/Badge';
import Card from '@components/common/Card';
import RetroButton from '@components/common/RetroButton';
import UseScoreLabelGenerator from '@hooks/useScoreLabelGenerator';
import ProgressBar from './ProgressBar/ProgressBar';
import styles from './UserScoreAndStats.module.scss';

export default function UserScoreAndStats({ props }: any) {
  const score =
    props['user'][0]['last_updated_snapshot']['portfolios']['season_1'][
      'score'
    ];
  const { currentLabel, nextThreshold } = UseScoreLabelGenerator(score);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.update_button_aura}>
          <RetroButton variant="dark_purple">
            <div className={styles.update_button_text}>Update Stats</div>
          </RetroButton>
        </div>
        <div className={styles.title}>{currentLabel}</div>
        <div className={styles.score_and_next_tier_row}>
          <div className={styles.score_text}>{score}</div>
        </div>
        <ProgressBar props={props} />
      </div>
    </>
  );
}
