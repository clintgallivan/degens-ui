import { useState, useEffect } from 'react';

export default function useLeaderboardSorter(data: any) {
  let reducedData: any[] = [];
  const dataReducer = () => {
    data.forEach((item: any) => {
      reducedData.push({
        coingecko_id: item.coingecko_id,
        name: item.name,
        symbol: item.symbol,
        coingecko_score: item.coingecko_score,
        coingecko_score_rank: item.degen_rank,
        image: item.image,
        dev_score: item.dev_score,
        dev_score_rank: item.dev_rank,
        community_score: item.community_score,
        community_score_rank: item.community_rank,
        liquidity_score: item.liquidity_score,
        liquidity_score_rank: item.liquidity_rank,
      });
    });
  };
  dataReducer();
  console.log(reducedData);
  const by_degen_score = reducedData.slice().sort((a, b) => {
    return a.coingecko_score_rank - b.coingecko_score_rank;
  });
  const by_developer_score = reducedData.slice().sort((a, b) => {
    return a.dev_score_rank - b.dev_score_rank;
  });
  const by_community_score = reducedData.slice().sort((a, b) => {
    return a.community_score_rank - b.community_score_rank;
  });
  const by_liquidity_score = reducedData.slice().sort((a, b) => {
    return a.liquidity_score_rank - b.liquidity_score_rank;
  });
  const output = {
    by_degen_score,
    by_developer_score,
    by_community_score,
    by_liquidity_score,
  };
  console.log(output);
  return output;
}
