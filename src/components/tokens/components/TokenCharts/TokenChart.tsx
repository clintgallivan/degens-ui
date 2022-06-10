import Card from '@components/common/Card';
import React, { useState } from 'react';
import moment from 'moment';

import {
  Area,
  AreaChart,
  Label,
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

export default function TokenChart({ props }) {
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

  const arr = props.tokenTimeseries[0].historical.slice().sort((a, b) => {
    let keyA = new Date(a.timestamp),
      keyB = new Date(b.timestamp);
    // Compare the 2 dates
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });

  const CustomToolTip = () => {};

  return (
    <Card>
      <div
        className="highlight-bar-charts"
        style={{ userSelect: 'none', width: '100%' }}
      >
        <div className={styles.row_container}>
          <ButtonRow
            onClick={(item) => setGroup(item.text)}
            selectedChild={group}
            children={[
              { text: 'Community' },
              { text: 'Developer' },
              { text: 'General' },
            ]}
          />
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
            children={
              group === 'Community'
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
          />
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart width={800} height={400} data={arr}>
            <CartesianGrid vertical={false} stroke="white" />

            <XAxis
              dataKey="timestamp"
              domain={[state.left, state.right]}
              name="Time"
              tickFormatter={(unixTime) => moment(unixTime).format('l')}
              type="category"
              stroke="white"
            />
            <YAxis
              allowDataOverflow
              domain={[state.bottom, state.top]}
              type="number"
              yAxisId="1"
              stroke="white"
            />
            <Tooltip
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
              animationDuration={1000}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
