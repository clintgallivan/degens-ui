import Card from '@components/common/Card';
import styles from './RecentStats.module.scss';

export default function RecentStats({ props }: any) {
  return (
    <div className={styles.container}>
      <Card>
        <div className={styles.title}>Last 30 Days</div>
        <div>
          <div className={styles.sub_title}>Degen Score:</div>
          <div className={styles.percent_and_value_row}>
            <div className={styles.percent_text_increase}>+20%</div>
            <div>100</div>
          </div>
          <div className={styles.sub_title}>Risk Score:</div>
          <div className={styles.percent_and_value_row}>
            <div className={styles.percent_text_decrease}>-20%</div>
            <div>100</div>
          </div>
          <div className={styles.sub_title}>League Rank:</div>
          <div className={styles.percent_and_value_row}>
            <div className={styles.percent_text_increase}>+20%</div>
            <div>100</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
