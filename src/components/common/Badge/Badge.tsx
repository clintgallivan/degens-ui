import UseScoreLabelGenerator from '@hooks/useScoreLabelGenerator';
import styles from './Badge.module.scss';

type BadgeProps = {
  score: any;
  level?: 'current' | 'next' | 'previous';
};

export default function Badge({ score, level = 'current' }: BadgeProps) {
  const { scoreLabelPairs } = UseScoreLabelGenerator(score);
  return (
    <>
      {score < scoreLabelPairs[0]['score'] ? (
        <div
          className={
            level == 'current'
              ? styles.container_0
              : level == 'next'
              ? styles.container_0_next
              : styles.container_0_previous
          }
        >
          {level == 'current'
            ? scoreLabelPairs[0]['label']
            : level == 'next'
            ? scoreLabelPairs[1]['label']
            : null}
        </div>
      ) : score < scoreLabelPairs[1]['score'] ? (
        <div
          className={
            level == 'current'
              ? styles.container_1
              : level == 'next'
              ? styles.container_1_next
              : styles.container_1_previous
          }
        >
          {level == 'current'
            ? scoreLabelPairs[1]['label']
            : level == 'next'
            ? scoreLabelPairs[2]['label']
            : scoreLabelPairs[0]['label']}
        </div>
      ) : score < scoreLabelPairs[2]['score'] ? (
        <div
          className={
            level == 'current'
              ? styles.container_2
              : level == 'next'
              ? styles.container_2_next
              : styles.container_2_previous
          }
        >
          {level == 'current'
            ? scoreLabelPairs[2]['label']
            : level == 'next'
            ? scoreLabelPairs[3]['label']
            : scoreLabelPairs[1]['label']}
        </div>
      ) : score < scoreLabelPairs[3]['score'] ? (
        <div
          className={
            level == 'current'
              ? styles.container_3
              : level == 'next'
              ? styles.container_3_next
              : styles.container_3_previous
          }
        >
          {level == 'current'
            ? scoreLabelPairs[3]['label']
            : level == 'next'
            ? scoreLabelPairs[4]['label']
            : scoreLabelPairs[2]['label']}
        </div>
      ) : score < scoreLabelPairs[4]['score'] ? (
        <div
          className={
            level == 'current'
              ? styles.container_4
              : level == 'next'
              ? styles.container_4_next
              : styles.container_4_previous
          }
        >
          {level == 'current'
            ? scoreLabelPairs[4]['label']
            : level == 'next'
            ? scoreLabelPairs[5]['label']
            : scoreLabelPairs[3]['label']}
        </div>
      ) : score < scoreLabelPairs[5]['score'] ? (
        <div
          className={
            level == 'current'
              ? styles.container_5
              : level == 'next'
              ? styles.container_5_next
              : styles.container_5_previous
          }
        >
          {level == 'current'
            ? scoreLabelPairs[5]['label']
            : level == 'next'
            ? scoreLabelPairs[6]['label']
            : scoreLabelPairs[4]['label']}
        </div>
      ) : score < scoreLabelPairs[6]['score'] ? (
        <div
          className={
            level == 'current'
              ? styles.container_6
              : level == 'next'
              ? styles.container_6_next
              : styles.container_6_previous
          }
        >
          {level == 'current'
            ? scoreLabelPairs[6]['label']
            : level == 'next'
            ? scoreLabelPairs[7]['label']
            : scoreLabelPairs[5]['label']}
        </div>
      ) : score < scoreLabelPairs[7]['score'] ? (
        <div
          className={
            level == 'current'
              ? styles.container_7
              : level == 'next'
              ? styles.container_7_next
              : styles.container_7_previous
          }
        >
          {level == 'current'
            ? scoreLabelPairs[7]['label']
            : level == 'next'
            ? scoreLabelPairs[8]['label']
            : scoreLabelPairs[6]['label']}
        </div>
      ) : score < scoreLabelPairs[8]['score'] ? (
        <div
          className={
            level == 'current'
              ? styles.container_8
              : level == 'next'
              ? styles.container_8_next
              : styles.container_8_previous
          }
        >
          {level == 'current'
            ? scoreLabelPairs[8]['label']
            : level == 'next'
            ? scoreLabelPairs[9]['label']
            : scoreLabelPairs[7]['label']}
        </div>
      ) : score < scoreLabelPairs[9]['score'] ? (
        <div
          className={
            level == 'current'
              ? styles.container_9
              : level == 'next'
              ? styles.container_9_next
              : styles.container_9_previous
          }
        >
          {level == 'current'
            ? scoreLabelPairs[9]['label']
            : level == 'next'
            ? scoreLabelPairs[10]['label']
            : scoreLabelPairs[8]['label']}
        </div>
      ) : score < scoreLabelPairs[10]['score'] ? (
        <div
          className={
            level == 'current'
              ? styles.container_10
              : level == 'next'
              ? styles.container_10_next
              : styles.container_10_previous
          }
        >
          {level == 'current'
            ? scoreLabelPairs[10]['label']
            : level == 'next'
            ? scoreLabelPairs[11]['label']
            : scoreLabelPairs[9]['label']}
        </div>
      ) : score >= scoreLabelPairs[10]['score'] ? (
        <div
          className={
            level == 'current'
              ? styles.container_11
              : level == 'next'
              ? styles.container_11_next
              : styles.container_11_previous
          }
        >
          {level == 'current'
            ? scoreLabelPairs[11]['label']
            : level == 'next'
            ? null
            : scoreLabelPairs[10]['label']}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
