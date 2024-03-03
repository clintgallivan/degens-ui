import Card from '@components/common/Card';
import DistributionPieChart from './DistributionPieChart';
import DistributionTable from './DistributionTable';
import styles from './PortfolioDistribution.module.scss';

export default function PortfolioDistribution({
    props,
    portfolio,
    setPortfolio,
    selectedTimestamp,
    setselectedTimestamp,
}: any) {
    return (
        <div className={styles.container}>
            <Card>
                <div className={styles.title}>Distribution</div>
                <div className={styles.inner_container}>
                    <DistributionPieChart
                        props={props}
                        portfolio={portfolio}
                        setPortfolio={setPortfolio}
                        selectedTimestamp={selectedTimestamp}
                        setselectedTimestamp={setselectedTimestamp}
                    />
                    <DistributionTable
                        props={props}
                        portfolio={portfolio}
                        setPortfolio={setPortfolio}
                        selectedTimestamp={selectedTimestamp}
                        setselectedTimestamp={setselectedTimestamp}
                    />
                </div>
            </Card>
        </div>
    );
}
