import Badge from '@components/common/Badge';
import UseScoreLabelGenerator from '@hooks/useScoreLabelGenerator';
import styles from './ProgressBar.module.scss';

export default function ProgressBar({ props }: any) {
  const score =
    props['user'][0]['last_updated_snapshot']['portfolios']['season_1'][
      'score'
    ];
  const { nextThreshold, previousThreshold, currentPercentage } =
    UseScoreLabelGenerator(score);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.bar_container}>
          <div
            style={{
              width: `${currentPercentage}%`,
              backgroundColor: 'var(--orange-20)',
            }}
            className={styles.bar_fill}
          ></div>
          {/* <div
            style={{ width: '10%', backgroundColor: 'var(--orange-20)' }}
            className={styles.bar_fill_change}
          ></div> */}
        </div>
        <div className={styles.min_max_row}>
          <div className={styles.next_badge_and_score_container}>
            {previousThreshold ? (
              <>
                <Badge level="previous" score={score} />
                <div>{previousThreshold}</div>
              </>
            ) : null}
          </div>
          <div className={styles.next_badge_and_score_container}>
            {nextThreshold ? (
              <>
                <Badge level="next" score={score} />
                <div>{nextThreshold ? nextThreshold : null}</div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
