import Card from '@components/common/Card';
import useWindowSize from '@hooks/useWindowSize';
import { toFixedNumber } from '@utils/text';
import { useEffect, useState } from 'react';
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import styles from './DistributionPieChart.module.scss';

export default function DistributionPieChart({ props, portfolio, selectedTimestamp }: any) {
    const { width = 0 } = useWindowSize();
    const [chartWidth, setChartWidth] = useState(0);

    const data = [];
    console.log(portfolio);
    const [portfolioTokens, setPortfolioTokens] = useState(
        props.user[0].last_updated_snapshot.portfolios[portfolio][0].tokens,
    );
    for (const i in portfolioTokens) {
        const newDataObj: any = {};
        newDataObj.name = portfolioTokens[i].coingecko_id;
        // newDataObj.value = toFixedNumber(portfolioTokens[i].percent * 100, 2);
        // newDataObj.value = toFixedNumber({ number: portfolioTokens[i].percent * 100, digits: 2 });
        newDataObj.value = toFixedNumber(portfolioTokens[i].percent * 100);
        newDataObj.fill = 'var(--purple-8)';
        newDataObj.image = portfolioTokens[i].image;
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

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        image,
        index,
    }: any) => {
        console.log(image);
        const radius = outerRadius * 1.2;
        // const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        return (
            <>
                <svg
                    x={x}
                    y={y}
                    fill="white"
                    // textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline="central"
                >
                    <image width="30" height="30" href={image} />
                </svg>
                <text
                    x={x - 35}
                    y={y + 15}
                    fill="white"
                    // textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline="central"
                >
                    {`${(percent * 100).toFixed(0)}%`}
                </text>
            </>
        );
    };

    useEffect(() => {
        props.user[0].historical.portfolios[portfolio].forEach((obj, idx) => {
            if (obj.timestamp === selectedTimestamp) {
                setPortfolioTokens(props.user[0].historical.portfolios[portfolio][idx].tokens);
            }
        });
    }, [selectedTimestamp]);

    return (
        <div className={styles.container}>
            {/* <ResponsiveContainer
                className={styles.resp_container}
                key={chartWidth}
                // width="100%"
                width={250}
                height={300}
            > */}
            <PieChart width={320} height={300}>
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
                    label={renderCustomizedLabel}
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
            {/* </ResponsiveContainer> */}
        </div>
    );
}
// import Card from '@components/common/Card';
// import useWindowSize from '@hooks/useWindowSize';
// import { toFixedNumber } from '@utils/text';
// import { useEffect, useState } from 'react';
// import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
// import styles from './DistributionPieChart.module.scss';

// export default function DistributionPieChart({ props, portfolio }: any) {
//     const { width = 0 } = useWindowSize();
//     const [chartWidth, setChartWidth] = useState(0);

//     const data = [];

//     const portfolioTokens = props.user[0].last_updated_snapshot.portfolios[portfolio][0].tokens;
//     for (const i in portfolioTokens) {
//         const newDataObj: any = {};
//         newDataObj.name = portfolioTokens[i].coingecko_id;
//         // newDataObj.value = toFixedNumber(portfolioTokens[i].percent * 100, 2);
//         // newDataObj.value = toFixedNumber({ number: portfolioTokens[i].percent * 100, digits: 2 });
//         newDataObj.value = toFixedNumber(portfolioTokens[i].percent * 100);
//         newDataObj.fill = 'var(--purple-8)';
//         newDataObj.image = portfolioTokens[i].image;
//         data.push(newDataObj);
//     }

//     useEffect(() => {
//         setChartWidth(width);
//     }, [width]);

//     function CustomTooltip({ active, payload, label }: any) {
//         function numberWithCommasDecimal(x: number) {
//             return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
//         }

//         if (active && payload && payload.length) {
//             const val = payload[0].value;
//             const dataKey = payload[0].name;
//             const phrase = dataKey
//                 .slice(dataKey.indexOf('.') + 1, dataKey.length)
//                 .replaceAll('_', ' ');
//             return (
//                 <div className={styles.tooltip_container}>
//                     <Card>
//                         <div className={styles.tooltip_value_row}>
//                             <div className={styles.tooltip_val}>{toFixedNumber(val)}%</div>
//                             <div>{phrase}</div>
//                         </div>
//                         {/* <div>
//               {day} {date}
//             </div> */}
//                     </Card>
//                 </div>
//             );
//         }
//         return null;
//     }

//     const RADIAN = Math.PI / 180;
//     const renderCustomizedLabel = ({
//         cx,
//         cy,
//         midAngle,
//         innerRadius,
//         outerRadius,
//         percent,
//         image,
//         index,
//     }: any) => {
//         console.log(image);
//         const radius = outerRadius * 1.2;
//         // const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//         const x = cx + radius * Math.cos(-midAngle * RADIAN);
//         const y = cy + radius * Math.sin(-midAngle * RADIAN);
//         return (
//             <>
//                 <svg
//                     x={x}
//                     y={y}
//                     fill="white"
//                     // textAnchor={x > cx ? 'start' : 'end'}
//                     dominantBaseline="central"
//                 >
//                     <image width="30" height="30" href={image} />
//                 </svg>
//                 <text
//                     x={x - 35}
//                     y={y + 15}
//                     fill="white"
//                     // textAnchor={x > cx ? 'start' : 'end'}
//                     dominantBaseline="central"
//                 >
//                     {`${(percent * 100).toFixed(0)}%`}
//                 </text>
//             </>
//         );
//     };

//     return (
//         <div className={styles.container}>
//             {/* <ResponsiveContainer
//                 className={styles.resp_container}
//                 key={chartWidth}
//                 // width="100%"
//                 width={250}
//                 height={300}
//             > */}
//             <PieChart width={320} height={300}>
//                 <Pie
//                     data={data}
//                     dataKey="value"
//                     nameKey="name"
//                     cx="50%"
//                     cy="50%"
//                     // outerRadius={width >= 480 ? 100 : 80}
//                     // innerRadius={width >= 480 ? 80 : 60}
//                     outerRadius={100}
//                     innerRadius={80}
//                     fill="fill"
//                     stroke="var(--green-10)"
//                     strokeWidth={3}
//                     label={renderCustomizedLabel}
//                     labelLine={false}
//                     isAnimationActive={false}
//                 />
//                 <Tooltip
//                     content={<CustomTooltip />}
//                     // position={{ y: 0, x: 0 }}
//                     active
//                     // cursor={{
//                     //   strokeWidth: 5,
//                     //   stroke: 'var(--green-10)',
//                     //   strokeOpacity: 0.5,
//                     // }}
//                 />
//             </PieChart>
//             {/* </ResponsiveContainer> */}
//         </div>
//     );
// }
