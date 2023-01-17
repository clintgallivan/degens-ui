import Card from '@components/common/Card';
import useWindowSize from '@hooks/useWindowSize';
import { toFixedNumber } from '@utils/text';
import { useEffect, useState } from 'react';
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import styles from './DistributionPieChart.module.scss';

export default function DistributionPieChart({ props }: any) {
    const { width = 0 } = useWindowSize();
    const [chartWidth, setChartWidth] = useState(0);
    const data01 = [
        {
            name: 'Ethereum',
            value: 27,
            fill: 'var(--green-8)',
        },
        {
            name: 'Bitcoin',
            value: 73,
            fill: 'var(--purple-8)',
        },
        {
            name: 'Bitn',
            value: 73,
            fill: 'var(--purple-10)',
        },
        {
            name: 'Bitcin',
            value: 73,
            fill: 'var(--purple-20)',
        },
        {
            name: 'Bioin',
            value: 73,
            fill: 'var(--purple-30)',
        },
    ];

    const data = [];

    const portfolioTokens = props.user[0].last_updated_snapshot.portfolios.season_1[0].tokens;
    for (const i in portfolioTokens) {
        const newDataObj: any = {};
        newDataObj.name = portfolioTokens[i].coingecko_id;
        // newDataObj.value = toFixedNumber(portfolioTokens[i].percent * 100, 2);
        // newDataObj.value = toFixedNumber({ number: portfolioTokens[i].percent * 100, digits: 2 });
        newDataObj.value = toFixedNumber(portfolioTokens[i].percent * 100);
        newDataObj.fill = 'var(--purple-8)';
        data.push(newDataObj);
    }

    useEffect(() => {
        setChartWidth(width);
    }, [width]);

    function CustomTooltip({ active, payload, label }: any) {
        function numberWithCommasDecimal(x: number) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }

        if (active && payload && payload.length) {
            const val = payload[0].value;
            const dataKey = payload[0].name;
            const phrase = dataKey
                .slice(dataKey.indexOf('.') + 1, dataKey.length)
                .replaceAll('_', ' ');
            return (
                <div className={styles.tooltip_container}>
                    <Card>
                        <div className={styles.tooltip_value_row}>
                            <div className={styles.tooltip_val}>{toFixedNumber(val)}%</div>
                            <div>{phrase}</div>
                        </div>
                        {/* <div>
              {day} {date}
            </div> */}
                    </Card>
                </div>
            );
        }
        return null;
    }

    return (
        <div className={styles.container}>
            <ResponsiveContainer
                className={styles.resp_container}
                key={chartWidth}
                // width="100%"
                width={250}
                height={300}
            >
                <PieChart width={730} height={250}>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        // outerRadius={width >= 480 ? 100 : 80}
                        // innerRadius={width >= 480 ? 80 : 60}
                        outerRadius={100}
                        innerRadius={80}
                        fill="fill"
                        stroke="var(--green-10)"
                        strokeWidth={3}
                        label
                        labelLine={false}
                        isAnimationActive={false}
                    />
                    <Tooltip
                        content={<CustomTooltip />}
                        // position={{ y: 0, x: 0 }}
                        active
                        // cursor={{
                        //   strokeWidth: 5,
                        //   stroke: 'var(--green-10)',
                        //   strokeOpacity: 0.5,
                        // }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
