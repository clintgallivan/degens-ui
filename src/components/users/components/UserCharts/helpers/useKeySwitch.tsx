const useKeySwitch = (
  group: string,
  currentSeasonDropdownText: string,
  allTimeDropdownText: string
) => {
  let key = '';
  switch (group) {
    case 'Current Season Portfolio':
      switch (currentSeasonDropdownText) {
        case 'Degen Score':
          key = 'score';
          break;
        // case 'Portfolio Distribution':
        //   key = 'tokens';
        //   break;
        case 'Risk Score (Avg Mcap Rank)':
          key = 'average_mcap_rank';
          break;
        // case 'Season Rank':
        //   key = 'tbd';
        //   break;
        default:
          key = 'score';
      }
      break;
    case 'All Time Portfolio':
      switch (allTimeDropdownText) {
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
  }
  return key;
};

export default useKeySwitch;
