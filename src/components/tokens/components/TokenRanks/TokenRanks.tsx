import Card from '@components/common/Card';
import styles from './TokenRanks.module.scss';
import { Row, Col } from 'react-bootstrap';

export default function TokenRanks({ props }: any) {
    const degenRank =
        props.tokenTimeseries[0].historical[0].degen_rank ||
        props.tokenTimeseries[0].historical[1].degen_rank;
    const developerRank =
        props.tokenTimeseries[0].historical[0].dev_rank ||
        props.tokenTimeseries[0].historical[1].dev_rank;
    const communityRank =
        props.tokenTimeseries[0].historical[0].community_rank ||
        props.tokenTimeseries[0].historical[1].community_rank;
    const liquidityRank =
        props.tokenTimeseries[0].historical[0].liquidity_rank ||
        props.tokenTimeseries[0].historical[1].liquidity_rank;

    return (
        <Row className={styles.container}>
            <Col className={styles.col}>
                <div className={styles.card_box}>
                    <Card header={<div className={styles.header_text}>Degen Rank</div>}>
                        {<div className={styles.rank_text}>{!degenRank ? '--' : degenRank}</div>}
                    </Card>
                </div>
            </Col>
            <Col className={styles.col}>
                <div className={styles.card_box}>
                    <Card header={<div className={styles.header_text}>Developer Rank</div>}>
                        {
                            <div className={styles.rank_text}>
                                {!developerRank ? '--' : developerRank}
                            </div>
                        }
                    </Card>
                </div>
            </Col>
            <Col className={styles.col}>
                <div className={styles.card_box}>
                    <Card header={<div className={styles.header_text}>Community Rank</div>}>
                        {
                            <div className={styles.rank_text}>
                                {!communityRank ? '--' : communityRank}
                            </div>
                        }
                    </Card>
                </div>
            </Col>
            <Col className={styles.col}>
                <div className={styles.card_box}>
                    <Card header={<div className={styles.header_text}>Liquidity Rank</div>}>
                        {
                            <div className={styles.rank_text}>
                                {!liquidityRank ? '--' : liquidityRank}
                            </div>
                        }
                    </Card>
                </div>
            </Col>
        </Row>
    );
}
