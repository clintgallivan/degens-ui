import Card from '@components/common/Card';
import DistributionPieChart from './DistributionPieChart';
import DistributionTable from './DistributionTable';
import styles from './PortfolioDistribution.module.scss';

export default function PortfolioDistribution({ props }: any) {
  return (
    <div className={styles.container}>
      <Card>
        <div className={styles.title}>Distribution</div>
        <div className={styles.inner_container}>
          <DistributionPieChart props={props} />
          <DistributionTable props={props} />
        </div>
      </Card>
    </div>
  );
}
