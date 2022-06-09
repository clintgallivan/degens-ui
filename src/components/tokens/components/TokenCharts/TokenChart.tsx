import Card from '@components/common/Card';
import React, { PureComponent, useState } from 'react';
import moment from 'moment';
// import moment from 'moment-timezone';
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
  ReferenceArea,
  ResponsiveContainer,
} from 'recharts';
import Dropdown from '@components/common/Dropdown';

import styles from './TokenChart.module.scss';
import { group } from 'console';
import ButtonRow from '@components/common/ButtonRow';

const initialData = [];

const getAxisYDomain = (from, to, ref, offset) => {
  const refData = initialData.slice(from - 1, to);
  let [bottom, top] = [refData[0][ref], refData[0][ref]];
  refData.forEach((d) => {
    if (d[ref] > top) top = d[ref];
    if (d[ref] < bottom) bottom = d[ref];
  });

  return [(bottom | 0) - offset, (top | 0) + offset];
};

const initialState = {
  data: initialData,
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

// export default class Example extends PureComponent {
export default function TokenChart({ props }) {
  const [state, setState] = useState(initialState);
  const [group, setGroup] = useState('Community');
  const [communityDropdownText, setCommunityDropdownText] =
    useState('Twitter Followers');
  const [developerDropdownText, setDeveloperDropdownText] =
    useState('Github Forks');
  const [generalDropdownText, setGeneralDropdownText] = useState('Degen Rank');

  // console.log(props.tokenTimeseries[0].historical);
  var arr = props.tokenTimeseries[0].historical;
  var arr = arr.slice().sort((a, b) => {
    var keyA = new Date(a.timestamp),
      keyB = new Date(b.timestamp);
    // Compare the 2 dates
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });

  let key = '';
  switch (group) {
    case 'Community':
      switch (communityDropdownText) {
        case 'Twitter Followers':
          key = 'community_data.twitter_followers';
          break;
        case 'Reddit Subscribers':
          key = 'community_data.reddit_subscribers';
          break;
        case 'Telegram Channel Members':
          key = 'community_data.telegram_channel_user_count';
          break;
        case '48hr average Reddit posts':
          key = 'community_data.reddit_average_posts_48h';
          break;
        case '48hr average Reddit comments':
          key = 'community_data.reddit_average_comments_48h';
          break;
        case '48hr active Reddit accounts':
          key = 'community_data.reddit_accounts_active_48h';
          break;
        default:
          key = 'community_data.twitter_followers';
      }
      break;
    case 'Developer':
      switch (developerDropdownText) {
        case 'Github Forks':
          key = 'developer_data.forks';
          break;
        case 'Github Stars':
          key = 'developer_data.stars';
          break;
        case 'Github Subscribers':
          key = 'developer_data.subscribers';
          break;
        case 'Github Total Issues':
          key = 'developer_data.total_issues';
          break;
        case 'Github Closed Issues':
          key = 'developer_data.closed_issues';
          break;
        case 'Github Contributors':
          key = 'developer_data.pull_request_contributors';
          break;
        default:
          key = 'developer_data.forks';
      }
      break;
    case 'General':
      switch (generalDropdownText) {
        case 'Price':
          key = 'price';
          break;
        case 'Market Cap':
          key = 'market_cap';
          break;
        case 'Market Cap Rank':
          key = 'market_cap_rank';
          break;
        case 'Degen Rank':
          key = 'degen_rank';
          break;
        case 'Developer Rank':
          key = 'dev_rank';
          break;
        case 'Community Rank':
          key = 'community_rank';
          break;
        case 'Liquidity Rank':
          key = 'liquidity_rank';
          break;
        default:
          key = 'developer_data.forks';
      }
  }

  const zoom = () => {
    let { refAreaLeft, refAreaRight } = state;
    const { data } = state;

    if (refAreaLeft === refAreaRight || refAreaRight === '') {
      setState({ ...state, refAreaLeft: '', refAreaRight: '' });
      return;
    }

    // xAxis domain
    if (refAreaLeft > refAreaRight)
      [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

    // yAxis domain
    const [bottom, top] = getAxisYDomain(refAreaLeft, refAreaRight, 'cost', 1);
    const [bottom2, top2] = getAxisYDomain(
      refAreaLeft,
      refAreaRight,
      'impression',
      50
    );

    setState({
      ...state,
      refAreaLeft: '',
      refAreaRight: '',
      data: data.slice(),
      left: refAreaLeft,
      right: refAreaRight,
      bottom,
      top,
      bottom2,
      top2,
    });
  };

  const zoomOut = () => {
    const { data } = state;
    setState({
      ...state,
      data: data.slice(),
      refAreaLeft: '',
      refAreaRight: '',
      left: 'dataMin',
      right: 'dataMax',
      top: 'dataMax+1',
      bottom: 'dataMin',
      top2: 'dataMax+50',
      bottom2: 'dataMin+50',
    });
  };

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
          {/* <button type="button" className="btn update" onClick={zoomOut}>
            Zoom Out
          </button> */}
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            width={800}
            height={400}
            // data={state.data}
            // data={props.tokenTimeseries[0].historical}
            data={arr}
            // data={datas}
            onMouseDown={(e) =>
              setState({ ...state, refAreaLeft: e.activeLabel })
            }
            onMouseMove={(e) =>
              state.refAreaLeft &&
              setState({ ...state, refAreaRight: e.activeLabel })
            }
            onMouseUp={zoom}
          >
            <CartesianGrid
              // strokeDasharray="3 3"
              vertical={false}
              stroke="white"
            />
            {/* <XAxis
              // allowDataOverflow
              name="Time"
              dataKey="time"
              // tickFormatter={(unixTime) => moment(unixTime).format('HH:mm')}
              tickFormatter={(unixTime) => moment(unixTime).format('DD-MM-YY')}
              domain={[state.left, state.right]}
              type="number"
            /> */}
            <XAxis
              // allowDataOverflow
              dataKey="timestamp"
              domain={['auto', 'auto']}
              // domain={[state.left, state.right]}
              name="Time"
              tickFormatter={(unixTime) => moment(unixTime).format('l')}
              // tickFormatter={(unixTime) => moment(unixTime).format('DD')}
              type="category"
              stroke="white"
            />
            <YAxis
              allowDataOverflow
              // domain={[state.bottom, state.top]}
              domain={['auto', 'auto']}
              type="number"
              yAxisId="1"
              stroke="white"
            />
            {/* <YAxis
              orientation="right"
              allowDataOverflow
              domain={[state.bottom2, state.top2]}
              type="number"
              yAxisId="2"
            /> */}
            <Tooltip />
            {/* <Line
              yAxisId="1"
              type="natural"
              dataKey="developer_data.forks"
              stroke="red"
              strokeWidth={2}
              animationDuration={300}
            /> */}
            <Line
              dot={<></>}
              yAxisId="1"
              type="natural"
              dataKey={key}
              // dataKey="developer_data.forks"
              stroke="red"
              strokeWidth={2}
              animationDuration={1000}
            />
            {/* <Area
              type="monotone"
              dataKey="price"
              stroke="#8884d8"
              fill="#8884d8"
            /> */}
            {/* <Area
              // type="monotone"
              dataKey="price"
              stroke="grey"
              fillOpacity={1}
              fill="red"
              activeDot={{ stroke: 'white', strokeWidth: 3, r: 8 }}
            /> */}
            {/* <Line
              yAxisId="2"
              type="natural"
              dataKey="price"
              stroke="#82ca9d"
              animationDuration={300}
            /> */}

            {state.refAreaLeft && state.refAreaRight ? (
              <ReferenceArea
                yAxisId="1"
                x1={state.refAreaLeft}
                x2={state.refAreaRight}
                strokeOpacity={0.3}
              />
            ) : null}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
  // }
}

// import Card from '@components/common/Card';
// import React, { PureComponent, useState } from 'react';
// import moment from 'moment';
// // import moment from 'moment-timezone';
// import {
//   Area,
//   AreaChart,
//   Label,
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ReferenceArea,
//   ResponsiveContainer,
// } from 'recharts';

// const initialData = [
//   { name: 1, cost: 4.11, impression: 100 },
//   { name: 2, cost: 2.39, impression: 120 },
//   { name: 3, cost: 1.37, impression: 150 },
//   { name: 4, cost: 1.16, impression: 180 },
//   { name: 5, cost: 2.29, impression: 200 },
//   { name: 6, cost: 3, impression: 499 },
//   { name: 7, cost: 0.53, impression: 50 },
//   { name: 8, cost: 2.52, impression: 100 },
//   { name: 9, cost: 1.79, impression: 200 },
//   { name: 10, cost: 2.94, impression: 222 },
//   { name: 11, cost: 4.3, impression: 210 },
//   { name: 12, cost: 4.41, impression: 300 },
//   { name: 13, cost: 2.1, impression: 50 },
//   { name: 14, cost: 8, impression: 190 },
//   { name: 15, cost: 0, impression: 300 },
//   { name: 16, cost: 9, impression: 400 },
//   { name: 17, cost: 3, impression: 200 },
//   { name: 18, cost: 2, impression: 50 },
//   { name: 19, cost: 3, impression: 100 },
//   { name: 20, cost: 7, impression: 100 },
// ];

// const getAxisYDomain = (from, to, ref, offset) => {
//   const refData = initialData.slice(from - 1, to);
//   let [bottom, top] = [refData[0][ref], refData[0][ref]];
//   refData.forEach((d) => {
//     if (d[ref] > top) top = d[ref];
//     if (d[ref] < bottom) bottom = d[ref];
//   });

//   return [(bottom | 0) - offset, (top | 0) + offset];
// };

// const initialState = {
//   data: initialData,
//   left: 'dataMin',
//   right: 'dataMax',
//   refAreaLeft: '',
//   refAreaRight: '',
//   top: 'dataMax+1',
//   bottom: 'dataMin-1',
//   top2: 'dataMax+20',
//   bottom2: 'dataMin-20',
//   animation: true,
// };

// // export default class Example extends PureComponent {
// export default function TokenChart({ props }) {
//   const [state, setState] = useState(initialState);
//   console.log(props);

//   const datas = [
//     { timestamp: '2022-06-03T15:30:00.521Z', time: '2022-06-03', price: 16.88 },
//     { timestamp: '2022-06-04T16:30:00.521Z', time: '2022-06-04', price: 18.88 },
//     { timestamp: '2022-06-05T14:30:00.521Z', time: '2022-06-05', price: 17.88 },
//   ];

//   const data = [
//     {
//       name: 'Page A',
//       uv: 4000,
//       pv: 2400,
//       amt: 2400,
//     },
//     {
//       name: 'Page B',
//       uv: 3000,
//       pv: 1398,
//       amt: 2210,
//     },
//     {
//       name: 'Page C',
//       uv: 2000,
//       pv: 9800,
//       amt: 2290,
//     },
//     {
//       name: 'Page D',
//       uv: 2780,
//       pv: 3908,
//       amt: 2000,
//     },
//     {
//       name: 'Page E',
//       uv: 1890,
//       pv: 4800,
//       amt: 2181,
//     },
//     {
//       name: 'Page F',
//       uv: 2390,
//       pv: 3800,
//       amt: 2500,
//     },
//     {
//       name: 'Page G',
//       uv: 3490,
//       pv: 4300,
//       amt: 2100,
//     },
//   ];
//   // const dataTransformer = () => {
//   //   const output = [];
//   //   props.tokenTimeseries[0].historical.forEach((item) => {
//   //     const obj = {name: item.timestamp,  }
//   //     output.push(obj)
//   //   });
//   // };
//   // dataTransformer();
//   const zoom = () => {
//     let { refAreaLeft, refAreaRight } = state;
//     const { data } = state;

//     if (refAreaLeft === refAreaRight || refAreaRight === '') {
//       setState({ ...state, refAreaLeft: '', refAreaRight: '' });
//       return;
//     }

//     // xAxis domain
//     if (refAreaLeft > refAreaRight)
//       [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

//     // yAxis domain
//     const [bottom, top] = getAxisYDomain(refAreaLeft, refAreaRight, 'cost', 1);
//     const [bottom2, top2] = getAxisYDomain(
//       refAreaLeft,
//       refAreaRight,
//       'impression',
//       50
//     );

//     setState({
//       ...state,
//       refAreaLeft: '',
//       refAreaRight: '',
//       data: data.slice(),
//       left: refAreaLeft,
//       right: refAreaRight,
//       bottom,
//       top,
//       bottom2,
//       top2,
//     });
//   };

//   const zoomOut = () => {
//     const { data } = state;
//     setState({
//       ...state,
//       data: data.slice(),
//       refAreaLeft: '',
//       refAreaRight: '',
//       left: 'dataMin',
//       right: 'dataMax',
//       top: 'dataMax+1',
//       bottom: 'dataMin',
//       top2: 'dataMax+50',
//       bottom2: 'dataMin+50',
//     });
//   };

//   return (
//     <Card>
//       <div
//         className="highlight-bar-charts"
//         style={{ userSelect: 'none', width: '100%' }}
//       >
//         <button type="button" className="btn update" onClick={zoomOut}>
//           Zoom Out
//         </button>

//         <ResponsiveContainer width="100%" height={400}>
//           <AreaChart
//             width={500}
//             height={400}
//             // data={data}
//             data={props.tokenTimeseries[0].historical}
//             margin={{
//               top: 10,
//               right: 30,
//               left: 0,
//               bottom: 0,
//             }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis stroke="white" dataKey="name" />
//             <YAxis stroke="white" />
//             <Tooltip />
//             <Area
//               type="monotone"
//               dataKey="price"
//               stroke="red"
//               fill="#8884d8"
//               strokeWidth={2}
//             />
//           </AreaChart>
//         </ResponsiveContainer>
//       </div>
//     </Card>
//   );
//   // }
// }
