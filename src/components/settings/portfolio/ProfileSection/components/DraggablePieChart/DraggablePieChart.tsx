import Card from '@components/common/Card';
import useWindowSize from '@hooks/useWindowSize';
import { toFixedNumber } from '@utils/text';
import Image, { ImageLoaderProps } from 'next/image';
import React, { useEffect, useState } from 'react';
import { Label, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import styles from './DraggablePieChart.module.scss';

export default function DraggablePieChart({ props, weightValue }: any) {
    const imageLoader = ({ src, width, quality }: ImageLoaderProps) =>
        `${src}?w=${width}&q=${quality || 75}`;
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

    // const portfolioTokens = props.user[0].last_updated_snapshot.portfolios.season_1[0].tokens;
    const portfolioTokens = weightValue;
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
                    // label={item => {
                    //     console.log(item.image);
                    //     return (
                    //         <div>yo</div>
                    // <div className={styles.icon_container}>
                    // <Image
                    //     loader={imageLoader}
                    //     // src={item.image}
                    //     src={`${item.image}`}
                    //     alt=""
                    //     height={24}
                    //     width={24}
                    // />
                    // </div>
                    //     );
                    // }}
                    // label={labelHandler}
                    label={renderCustomizedLabel}
                    labelLine={false}
                    isAnimationActive={false}
                >
                    {/* <Label position="outside" offset={10}>
                        Some text
                    </Label>
                    <Label position="outside" offset={10}>
                        Some text
                    </Label> */}
                </Pie>
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
