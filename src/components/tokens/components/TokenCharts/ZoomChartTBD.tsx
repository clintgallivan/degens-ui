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
// import Dropdown from '@components/common/Dropdown';

// import styles from './TokenChart.module.scss';
// import { group } from 'console';
// import ButtonRow from '@components/common/ButtonRow';

// const initialData = [];

// // const getAxisYDomain = (from, to, ref, offset) => {
// //   const refData = initialData.slice(from - 1, to);
// //   let [bottom, top] = [refData[0][ref], refData[0][ref]];
// //   refData.forEach((d) => {
// //     if (d[ref] > top) top = d[ref];
// //     if (d[ref] < bottom) bottom = d[ref];
// //   });

// //   return [(bottom | 0) - offset, (top | 0) + offset];
// // };

// // const initialState = {
// //   data: initialData,
// //   left: 'dataMin',
// //   right: 'dataMax',
// //   refAreaLeft: '',
// //   refAreaRight: '',
// //   top: 'dataMax+1',
// //   bottom: 'dataMin-1',
// //   top2: 'dataMax+20',
// //   bottom2: 'dataMin-20',
// //   animation: true,
// // };

// // export default class Example extends PureComponent {
// export default function TokenChart({ props }) {
//   var arr = props.tokenTimeseries[0].historical;
//   var arr = arr.slice().sort((a, b) => {
//     var keyA = new Date(a.timestamp),
//       keyB = new Date(b.timestamp);
//     // Compare the 2 dates
//     if (keyA < keyB) return -1;
//     if (keyA > keyB) return 1;
//     return 0;
//   });
//   const initialState = {
//     data: arr,
//     left: 'dataMin',
//     right: 'dataMax',
//     refAreaLeft: '',
//     refAreaRight: '',
//     top: 'dataMax+1',
//     bottom: 'dataMin-1',
//     // top2: 'dataMax+20',
//     // bottom2: 'dataMin-20',
//     animation: true,
//   };

//   const [state, setState] = useState(initialState);
//   const [group, setGroup] = useState('Community');
//   const [communityDropdownText, setCommunityDropdownText] =
//     useState('Twitter Followers');
//   const [developerDropdownText, setDeveloperDropdownText] =
//     useState('Github Forks');
//   const [generalDropdownText, setGeneralDropdownText] = useState('Degen Rank');

//   const getAxisYDomain = (from, to, ref, offset) => {
//     const refData = data.slice(from, to + 1);
//     console.log(refData);
//     console.log(from, to);

//     let maxMin = () => {
//       let nums = [];
//       refData.forEach((item) => {
//         nums.push(item['community_data']['twitter_followers']);
//       });
//       const min = Math.min.apply(Math, nums);
//       const max = Math.max.apply(Math, nums);
//       return [min, max];
//     };
//     let [bottom, top] = maxMin();

//     refData.forEach((d) => {
//       if (d['community_data']['twitter_followers'] > top)
//         top = d['community_data']['twitter_followers'];
//       if (d['community_data']['twitter_followers'] < bottom)
//         bottom = d['community_data']['twitter_followers'];
//     });

//     return [(bottom | 0) - offset, (top | 0) + offset];
//   };

//   // console.log(props.tokenTimeseries[0].historical);
//   // var arr = props.tokenTimeseries[0].historical;
//   // var arr = arr.slice().sort((a, b) => {
//   //   var keyA = new Date(a.timestamp),
//   //     keyB = new Date(b.timestamp);
//   //   // Compare the 2 dates
//   //   if (keyA < keyB) return -1;
//   //   if (keyA > keyB) return 1;
//   //   return 0;
//   // });

//   let key = '';
//   switch (group) {
//     case 'Community':
//       switch (communityDropdownText) {
//         case 'Twitter Followers':
//           key = 'community_data.twitter_followers';
//           break;
//         case 'Reddit Subscribers':
//           key = 'community_data.reddit_subscribers';
//           break;
//         case 'Telegram Channel Members':
//           key = 'community_data.telegram_channel_user_count';
//           break;
//         case '48hr average Reddit posts':
//           key = 'community_data.reddit_average_posts_48h';
//           break;
//         case '48hr average Reddit comments':
//           key = 'community_data.reddit_average_comments_48h';
//           break;
//         case '48hr active Reddit accounts':
//           key = 'community_data.reddit_accounts_active_48h';
//           break;
//         default:
//           key = 'community_data.twitter_followers';
//       }
//       break;
//     case 'Developer':
//       switch (developerDropdownText) {
//         case 'Github Forks':
//           key = 'developer_data.forks';
//           break;
//         case 'Github Stars':
//           key = 'developer_data.stars';
//           break;
//         case 'Github Subscribers':
//           key = 'developer_data.subscribers';
//           break;
//         case 'Github Total Issues':
//           key = 'developer_data.total_issues';
//           break;
//         case 'Github Closed Issues':
//           key = 'developer_data.closed_issues';
//           break;
//         case 'Github Contributors':
//           key = 'developer_data.pull_request_contributors';
//           break;
//         default:
//           key = 'developer_data.forks';
//       }
//       break;
//     case 'General':
//       switch (generalDropdownText) {
//         case 'Price':
//           key = 'price';
//           break;
//         case 'Market Cap':
//           key = 'market_cap';
//           break;
//         case 'Market Cap Rank':
//           key = 'market_cap_rank';
//           break;
//         case 'Degen Rank':
//           key = 'degen_rank';
//           break;
//         case 'Developer Rank':
//           key = 'dev_rank';
//           break;
//         case 'Community Rank':
//           key = 'community_rank';
//           break;
//         case 'Liquidity Rank':
//           key = 'liquidity_rank';
//           break;
//         default:
//           key = 'developer_data.forks';
//       }
//   }

//   const zoom = () => {
//     let { refAreaLeft, refAreaRight } = state;
//     console.log(refAreaLeft, refAreaRight);
//     const { data } = state;
//     // console.log(data);
//     const newData = data.slice(refAreaLeft, refAreaRight);

//     //* handles no sliding: exits
//     if (refAreaLeft === refAreaRight || refAreaRight === '') {
//       setState({ ...state, refAreaLeft: '', refAreaRight: '' });
//       return;
//     }

//     // xAxis domain
//     if (refAreaLeft > refAreaRight)
//       [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

//     // yAxis domain
//     const [bottom, top] = getAxisYDomain(
//       refAreaLeft,
//       refAreaRight,
//       'community_data.twitter_followers',
//       1
//     );

//     setState({
//       ...state,
//       refAreaLeft: '',
//       refAreaRight: '',
//       data: data.slice(refAreaLeft, refAreaRight),
//       left: refAreaLeft,
//       right: refAreaRight,
//       bottom,
//       top,
//     });
//     console.log(state);
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

//   const {
//     data,
//     barIndex,
//     left,
//     right,
//     refAreaLeft,
//     refAreaRight,
//     top,
//     bottom,
//     top2,
//     bottom2,
//   } = state;

//   return (
//     <Card>
//       <div
//         className="highlight-bar-charts"
//         style={{ userSelect: 'none', width: '100%' }}
//       >
//         <div className={styles.row_container}>
//           <ButtonRow
//             onClick={(item) => setGroup(item.text)}
//             selectedChild={group}
//             children={[
//               { text: 'Community' },
//               { text: 'Developer' },
//               { text: 'General' },
//             ]}
//           />
//           <Dropdown
//             selectedChild={
//               group === 'Community'
//                 ? communityDropdownText
//                 : group === 'Developer'
//                 ? developerDropdownText
//                 : group === 'General'
//                 ? generalDropdownText
//                 : null
//             }
//             children={
//               group === 'Community'
//                 ? [
//                     { text: 'Twitter Followers' },
//                     { text: 'Reddit Subscribers' },
//                     { text: 'Telegram Channel Members' },
//                     { text: '48hr average Reddit posts' },
//                     { text: '48hr average Reddit comments' },
//                     { text: '48hr active Reddit accounts' },
//                   ]
//                 : group === 'Developer'
//                 ? [
//                     { text: 'Github Forks' },
//                     { text: 'Github Stars' },
//                     { text: 'Github Subscribers' },
//                     { text: 'Github Total Issues' },
//                     { text: 'Github Closed Issues' },
//                     { text: 'Github Contributors' },
//                   ]
//                 : group === 'General'
//                 ? [
//                     { text: 'Price' },
//                     { text: 'Market Cap' },
//                     { text: 'Market Cap Rank' },
//                     { text: 'Degen Rank' },
//                     { text: 'Developer Rank' },
//                     { text: 'Community Rank' },
//                     { text: 'Liquidity Rank' },
//                   ]
//                 : null
//             }
//             onClick={(item) => {
//               group === 'Community'
//                 ? setCommunityDropdownText(item.text)
//                 : group === 'Developer'
//                 ? setDeveloperDropdownText(item.text)
//                 : group === 'General'
//                 ? setGeneralDropdownText(item.text)
//                 : null;
//             }}
//           />
//           {/* <button type="button" className="btn update" onClick={zoomOut}>
//             Zoom Out
//           </button> */}
//         </div>

//         <ResponsiveContainer width="100%" height={400}>
//           <LineChart
//             width={800}
//             height={400}
//             // data={state.data}
//             // data={props.tokenTimeseries[0].historical}
//             data={data}
//             // data={datas}
//             onMouseDown={(e) => {
//               console.log(e);
//               setState({ ...state, refAreaLeft: e.activeTooltipIndex });
//             }}
//             onMouseMove={(e) => {
//               // console.log(e);
//               state.refAreaLeft &&
//                 setState({ ...state, refAreaRight: e.activeTooltipIndex });
//             }}
//             onMouseUp={zoom}
//           >
//             <CartesianGrid
//               // strokeDasharray="3 3"
//               vertical={false}
//               stroke="white"
//             />

//             <XAxis
//               // allowDataOverflow
//               dataKey="timestamp"
//               // domain={['auto', 'auto']}
//               domain={[left, right]}
//               name="Time"
//               tickFormatter={(unixTime) => moment(unixTime).format('l')}
//               // tickFormatter={(unixTime) => moment(unixTime).format('DD')}
//               type="category"
//               stroke="white"
//             />
//             <YAxis
//               allowDataOverflow
//               domain={[bottom, top]}
//               type="number"
//               yAxisId="1"
//               stroke="white"
//             />
//             <Tooltip
//               cursor={{
//                 strokeWidth: 5,
//                 stroke: 'var(--green-10)',
//                 strokeOpacity: 0.5,
//               }}
//             />
//             <Line
//               dot={<></>}
//               yAxisId="1"
//               type="natural"
//               dataKey={key}
//               stroke="gold"
//               strokeWidth={3}
//               animationDuration={1000}
//             />

//             {refAreaLeft && refAreaRight ? (
//               <ReferenceArea
//                 yAxisId="1"
//                 x1={state.refAreaLeft}
//                 x2={state.refAreaRight}
//                 // x1={refAreaLeft}
//                 // x2={refAreaRight}
//                 strokeOpacity={0.3}
//               />
//             ) : null}
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </Card>
//   );
// }
