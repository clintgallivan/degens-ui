import React, { useState, useEffect } from 'react';
import moment from 'moment';
import useWindowSize from '@hooks/useWindowSize';

import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

import Card from '@components/common/Card';
import ButtonRow from '@components/common/ButtonRow';
import Dropdown from '@components/common/Dropdown';
import useKeySwitch from './helpers/useKeySwitch';
import styles from './UserChart.module.scss';
import { toFixedNumber } from '@utils/text';

const initialState = {
    data: [],
    left: 'dataMin',
    right: 'dataMax',
    refAreaLeft: '',
    refAreaRight: '',
    top: 'dataMax+1',
    bottom: 'dataMin-1',
    top2: 'dataMax+20',
    bottom2: 'dataMin-20',
    animation: true,
};

function CustomTooltip({ active, payload, label }: any) {
    function numberWithCommasDecimal(x: number) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    if (active && payload && payload.length) {
        const day = moment(payload[0].payload.timestamp).format('dddd');
        const date = moment(payload[0].payload.timestamp).format('LL');
        const val = payload[0].value;
        const dataKey = payload[0].name;
        const phrase = dataKey.slice(dataKey.indexOf('.') + 1, dataKey.length).replaceAll('_', ' ');
        return (
            <div className={styles.tooltip_container}>
                <Card>
                    <div className={styles.tooltip_value_row}>
                        <div className={styles.tooltip_val}>{toFixedNumber(val, 2)}</div>
                        <div>{phrase}</div>
                    </div>
                    <div>
                        {day} {date}
                    </div>
                </Card>
            </div>
        );
    }
    return null;
}

function NoDataComponent({ noData }: { noData: boolean }) {
    // const keys = key.split('.');

    if (noData) {
        return <div className={styles.no_data}>No data available at this time</div>;
    }
    return <div />;
}

export default function UserChart({ props }: any) {
    const { width = 0 } = useWindowSize();
    const [chartWidth, setChartWidth] = useState(0);

    const [noData, setNoData] = useState(false);
    const [state, setState] = useState(initialState);
    const [group, setGroup] = useState('Current Season Portfolio');
    const [currentSeasonDropdownText, setCurrentSeasonDropdownText] = useState('Degen Score');
    const [allTimeDropdownText, setAllTimeDropdownText] = useState('Github Forks');

    const key = useKeySwitch(group, currentSeasonDropdownText, allTimeDropdownText);

    const arr = props.user[0].historical.portfolios.season_1.slice().sort((a: any, b: any) => {
        const keyA = new Date(a.timestamp);
        const keyB = new Date(b.timestamp);
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
    });
    const handleDataArr = () => {
        const output: any[] = [];
        arr.forEach((i: any) => {
            if (
                i.timestamp <= props.user[0].last_updated_snapshot.portfolios.season_1[0].timestamp
            ) {
                output.push(i);
            }
        });
        return output;
    };

    useEffect(() => {
        setChartWidth(width);
    }, [width]);

    return (
        <div className={styles.container}>
            <Card>
                <NoDataComponent noData={noData} />
                <div className={styles.card_container}>
                    <div className={styles.row_container}>
                        <Dropdown onClick={item => setGroup(item.text)} selectedChild={group}>
                            {[{ text: 'Current Season Portfolio' }, { text: 'All Time Portfolio' }]}
                        </Dropdown>

                        <Dropdown
                            selectedChild={
                                group === 'Current Season Portfolio'
                                    ? currentSeasonDropdownText
                                    : group === 'All Time Portfolio'
                                    ? allTimeDropdownText
                                    : null
                            }
                            onClick={item => {
                                if (group === 'Current Season Portfolio') {
                                    setCurrentSeasonDropdownText(item.text);
                                }
                                if (group === 'All Time Portfolio') {
                                    setAllTimeDropdownText(item.text);
                                }
                            }}
                        >
                            {group === 'Current Season Portfolio'
                                ? [
                                      { text: 'Degen Score' },
                                      { text: 'Portfolio Distribution' },
                                      { text: 'Risk Score (Avg Mcap Rank)' },
                                      // { text: 'Season Rank' },
                                  ]
                                : group === 'All Time Portfolio'
                                ? [
                                      { text: 'Portfolio Score' },
                                      { text: 'Portfolio Distribution' },
                                      { text: 'Risk Score (Avg Mcap Rank)' },
                                  ]
                                : null}
                        </Dropdown>
                    </div>

                    {noData ? (
                        <div style={{ height: 400 }} />
                    ) : (
                        <ResponsiveContainer key={chartWidth} width="100%" height={400}>
                            <LineChart height={400} data={handleDataArr()}>
                                <CartesianGrid vertical={false} stroke="white" />

                                <XAxis
                                    dataKey="timestamp"
                                    domain={[state.left, state.right]}
                                    name="Time"
                                    tickFormatter={unixTime => moment(unixTime).format('l')}
                                    type="category"
                                    stroke="white"
                                    padding={{ left: 40 }}
                                />
                                <YAxis
                                    allowDataOverflow
                                    domain={[state.bottom, state.top]}
                                    type="number"
                                    yAxisId="1"
                                    stroke="white"
                                    width={75}
                                />
                                <Tooltip
                                    content={<CustomTooltip />}
                                    position={{ y: 0 }}
                                    active
                                    cursor={{
                                        strokeWidth: 5,
                                        stroke: 'var(--green-10)',
                                        strokeOpacity: 0.5,
                                    }}
                                />
                                <Line
                                    dot={<div />}
                                    yAxisId="1"
                                    type="natural"
                                    dataKey={key}
                                    // dataKey="score"
                                    stroke="gold"
                                    strokeWidth={3}
                                    animationDuration={0}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    )}
                </div>
                {/* </div> */}
            </Card>
        </div>
    );
}
