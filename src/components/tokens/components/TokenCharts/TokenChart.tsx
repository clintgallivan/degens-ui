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

import styles from './TokenChart.module.scss';
import useKeySwitch from './helpers/useKeySwitch';
import Card from '@components/common/Card';
import ButtonRow from '@components/common/ButtonRow';
import Dropdown from '@components/common/Dropdown';

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

export default function TokenChart({ props }: any) {
  const { width = 0 } = useWindowSize();
  const [chartWidth, setChartWidth] = useState(0);

  const [noData, setNoData] = useState(false);
  const [state, setState] = useState(initialState);
  const [group, setGroup] = useState('Community');
  const [communityDropdownText, setCommunityDropdownText] =
    useState('Twitter Followers');
  const [developerDropdownText, setDeveloperDropdownText] =
    useState('Github Forks');
  const [generalDropdownText, setGeneralDropdownText] = useState('Degen Rank');
  const key = useKeySwitch(
    group,
    communityDropdownText,
    developerDropdownText,
    generalDropdownText
  );

  const arr = props.tokenTimeseries[0].historical
    .slice()
    .sort((a: any, b: any) => {
      let keyA = new Date(a.timestamp),
        keyB = new Date(b.timestamp);
      // Compare the 2 dates
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });

  const CustomTooltip = ({ active, payload, label }: any) => {
    function numberWithCommasDecimal(x: number) {
      return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
    }
    // console.log(payload);
    if (active && payload && payload.length) {
      const day = moment(payload[0]['payload']['timestamp']).format('dddd');
      const date = moment(payload[0]['payload']['timestamp']).format('LL');
      const val = payload[0]['value'];
      const dataKey = payload[0]['name'];
      const phrase = dataKey
        .slice(dataKey.indexOf('.') + 1, dataKey.length)
        .replaceAll('_', ' ');
      return (
        <div className={styles.tooltip_container}>
          <Card>
            <div className={styles.tooltip_value_row}>
              <div className={styles.tooltip_val}>
                {numberWithCommasDecimal(val)}
              </div>
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
  };

  const NoDataComponent = () => {
    const keys = key.split('.');

    if (noData) {
      return (
        <div className={styles.no_data}>No data available at this time</div>
      );
    } else {
      return <></>;
    }
  };

  useEffect(() => {
    const noDataChecker = () => {
      const keys = key.split('.');

      if (keys[1]) {
        if (!props.tokenTimeseries[0].historical[0][keys[0]][keys[1]]) {
          setNoData(true);
        } else {
          setNoData(false);
        }
      } else {
        if (!props.tokenTimeseries[0].historical[0][keys[0]]) {
          setNoData(true);
        } else {
          setNoData(false);
        }
      }
    };

    noDataChecker();
  }, [key]);

  useEffect(() => {
    setChartWidth(width);
  }, [width]);

  return (
    <Card>
      <NoDataComponent />
      <div className={styles.card_container}>
        <div className={styles.row_container}>
          <ButtonRow
            onClick={(item) => setGroup(item.text)}
            selectedChild={group}
          >
            {[
              { text: 'Community' },
              { text: 'Developer' },
              { text: 'General' },
            ]}
          </ButtonRow>

          <Dropdown
            selectedChild={
              group === 'Community'
                ? communityDropdownText
                : group === 'Developer'
                ? developerDropdownText
                : group === 'General'
                ? generalDropdownText
                : null
            }
            onClick={(item) => {
              group === 'Community'
                ? setCommunityDropdownText(item.text)
                : group === 'Developer'
                ? setDeveloperDropdownText(item.text)
                : group === 'General'
                ? setGeneralDropdownText(item.text)
                : null;
            }}
          >
            {group === 'Community'
              ? [
                  { text: 'Twitter Followers' },
                  { text: 'Reddit Subscribers' },
                  { text: 'Telegram Channel Members' },
                  { text: '48hr average Reddit posts' },
                  { text: '48hr average Reddit comments' },
                  { text: '48hr active Reddit accounts' },
                ]
              : group === 'Developer'
              ? [
                  { text: 'Github Forks' },
                  { text: 'Github Stars' },
                  { text: 'Github Subscribers' },
                  { text: 'Github Total Issues' },
                  { text: 'Github Closed Issues' },
                  { text: 'Github Contributors' },
                ]
              : group === 'General'
              ? [
                  { text: 'Price' },
                  { text: 'Market Cap' },
                  { text: 'Market Cap Rank' },
                  { text: 'Degen Rank' },
                  { text: 'Developer Rank' },
                  { text: 'Community Rank' },
                  { text: 'Liquidity Rank' },
                ]
              : null}
          </Dropdown>
        </div>

        {noData ? (
          <div style={{ height: 400 }}></div>
        ) : (
          <ResponsiveContainer key={chartWidth} width="100%" height={400}>
            <LineChart height={400} data={arr}>
              <CartesianGrid vertical={false} stroke="white" />

              <XAxis
                dataKey="timestamp"
                domain={[state.left, state.right]}
                name="Time"
                tickFormatter={(unixTime) => moment(unixTime).format('l')}
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
                active={true}
                cursor={{
                  strokeWidth: 5,
                  stroke: 'var(--green-10)',
                  strokeOpacity: 0.5,
                }}
              />
              <Line
                dot={<></>}
                yAxisId="1"
                type="natural"
                dataKey={key}
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
  );
}
