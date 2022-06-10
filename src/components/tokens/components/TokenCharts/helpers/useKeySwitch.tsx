const useKeySwitch = (
  group: string,
  communityDropdownText: string,
  developerDropdownText: string,
  generalDropdownText: string
) => {
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
  return key;
};
// let key = '';
// switch (group) {
//   case 'Community':
//     switch (communityDropdownText) {
//       case 'Twitter Followers':
//         key = 'community_data.twitter_followers';
//         break;
//       case 'Reddit Subscribers':
//         key = 'community_data.reddit_subscribers';
//         break;
//       case 'Telegram Channel Members':
//         key = 'community_data.telegram_channel_user_count';
//         break;
//       case '48hr average Reddit posts':
//         key = 'community_data.reddit_average_posts_48h';
//         break;
//       case '48hr average Reddit comments':
//         key = 'community_data.reddit_average_comments_48h';
//         break;
//       case '48hr active Reddit accounts':
//         key = 'community_data.reddit_accounts_active_48h';
//         break;
//       default:
//         key = 'community_data.twitter_followers';
//     }
//     break;
//   case 'Developer':
//     switch (developerDropdownText) {
//       case 'Github Forks':
//         key = 'developer_data.forks';
//         break;
//       case 'Github Stars':
//         key = 'developer_data.stars';
//         break;
//       case 'Github Subscribers':
//         key = 'developer_data.subscribers';
//         break;
//       case 'Github Total Issues':
//         key = 'developer_data.total_issues';
//         break;
//       case 'Github Closed Issues':
//         key = 'developer_data.closed_issues';
//         break;
//       case 'Github Contributors':
//         key = 'developer_data.pull_request_contributors';
//         break;
//       default:
//         key = 'developer_data.forks';
//     }
//     break;
//   case 'General':
//     switch (generalDropdownText) {
//       case 'Price':
//         key = 'price';
//         break;
//       case 'Market Cap':
//         key = 'market_cap';
//         break;
//       case 'Market Cap Rank':
//         key = 'market_cap_rank';
//         break;
//       case 'Degen Rank':
//         key = 'degen_rank';
//         break;
//       case 'Developer Rank':
//         key = 'dev_rank';
//         break;
//       case 'Community Rank':
//         key = 'community_rank';
//         break;
//       case 'Liquidity Rank':
//         key = 'liquidity_rank';
//         break;
//       default:
//         key = 'developer_data.forks';
//     }
// }

export default useKeySwitch;
