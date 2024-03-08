import Card from '@components/common/Card';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DraggablePieChart from './components/DraggablePieChart';
import EditableDistributionTable from './components/EditableDistributionTable';
import styles from './PortfolioSection.module.scss';
import Dropdown from '@components/common/Dropdown';
import RetroButton from '@components/common/RetroButton';
import axios from 'axios';
import humanizeDuration from 'humanize-duration';
import { log } from '@utils/console';
import { clientApi } from '@utils/api';

export type Portfolio = 'season_1' | 'all_time';

export enum DropdownText {
    'season_1' = 'Season 1',
    'all_time' = 'All Time',
}

export type SubstringSearchItem = {
    coingecko_id: string;
    degen_rank: string;
    image: URL;
    iterator: string[];
    market_cap_rank: number;
    // price: number;
};

export default function PortfolioSection({ props }: any) {
    const router = useRouter();
    const now: any = new Date();
    const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio>('season_1');
    const { portfolios } = props.user[0].historical;
    const portfolioTokens = props.user[0].historical.portfolios[selectedPortfolio][0].tokens;
    const roundPortfolioTokensToStart = () => {
        let output: any = [];
        let total = 0;

        // First, calculate the total sum of all percentages
        portfolioTokens.forEach((tokenObj: any) => {
            total += tokenObj.percent;
        });

        // Then, calculate the rounded percentages
        portfolioTokens.forEach((tokenObj: any) => {
            const roundedPercent =
                Math.round((tokenObj.percent / total + Number.EPSILON) * 100) / 100;
            tokenObj.percent = roundedPercent;
            output.push(tokenObj);
        });

        // Calculate the difference from 1
        let diff = 1 - output.reduce((sum: number, obj: any) => sum + obj.percent, 0);

        // Find the value closest to its lower integer after rounding
        let closest = output.reduce((prev: any, curr: any) => {
            let prevDiff = prev.percent - Math.floor(prev.percent);
            let currDiff = curr.percent - Math.floor(curr.percent);
            return prevDiff < currDiff ? prev : curr;
        });

        // Adjust the closest value by the difference
        closest.percent += diff;

        return output;
    };
    const roundPortfolioTokens = () => {
        let output: any = [];
        const handler = () => {
            portfolioTokens.forEach((tokenObj: any) => {
                const roundedPercent = Math.round((tokenObj.percent + Number.EPSILON) * 100) / 100;
                tokenObj.percent = roundedPercent;
                output.push(tokenObj);
            });
        };
        handler();
        return output;
    };
    const defaultValue = roundPortfolioTokensToStart();
    const [weightValue, setWeightValue] = useState(defaultValue);

    const currentTotalWeight = parseFloat(
        weightValue.reduce((sum: any, item: any) => sum + item.percent, 0).toFixed(2),
    );
    const [remainingWeight, setRemainingWeight] = useState(
        Math.round(100 - currentTotalWeight * 100),
    );
    // const remainingWeight = Math.round(100 - currentTotalWeight * 100);

    const addTokenRow = (item: SubstringSearchItem) => {
        const newState = [...weightValue];
        newState[weightValue.length] = {
            coingecko_id: item.coingecko_id,
            image: item.image,
            mcap_rank: item?.market_cap_rank || 1000,
            percent: 0,
        };
        setWeightValue(newState);
    };

    const removeTokenRow = (coingeckoId: any) => {
        const newState = [...weightValue];
        newState.forEach((item, index) => {
            if (item.coingecko_id === coingeckoId) {
                newState.splice(index, 1);
            }
        });
        setWeightValue(newState);
    };

    const refreshData = () => {
        router.replace(router.asPath);
    };

    const handleUpdateStats = async () => {
        const tenMinutes = (60 * 60 * 1000) / 6;
        const lastUpdatedAt: any = new Date(
            props.user[0].historical.portfolios[selectedPortfolio]?.[1]?.timestamp || tenMinutes,
        );
        const lastUpdatedAsDate: any = new Date(lastUpdatedAt);
        const humanReadableDuration = humanizeDuration(tenMinutes - (now - lastUpdatedAsDate), {
            units: ['d', 'h', 'm'],
            round: true,
        });
        if (now - lastUpdatedAsDate < tenMinutes) {
            alert(
                `Sorry, you will have to wait ${humanReadableDuration} before updating again. Thanks for your understanding.`,
            );
            return;
        }

        if (remainingWeight != 0) {
            alert('Please make sure you have allocated all your remaining weight.');
            return;
        }
        try {
            let historical: any = {
                portfolios: {},
            };
            Object.keys(portfolios).forEach(portfolio => {
                if (portfolio === selectedPortfolio) {
                    const pKey = portfolio;
                    const pValue = portfolios[portfolio];
                    historical.portfolios[pKey] = [pValue[0]];
                }
            });
            await clientApi.post('/api/handle-update-stats', {
                uid: props.user[0].uid,
                portfolio_metadata: props.user[0].portfolio_metadata,
                historical,
            });
            await new Promise(r => setTimeout(r, 750));

            const historical2 = JSON.parse(JSON.stringify(historical));
            historical2.portfolios[selectedPortfolio][0].tokens = weightValue;
            const res2 = await clientApi.post('/api/handle-update-stats', {
                uid: props.user[0].uid,
                portfolio_metadata: props.user[0].portfolio_metadata,
                historical: historical2,
            });
            res2.status === 200 ? refreshData() : log('failed to update');
        } catch (e) {
            log(e);
        }
    };

    useEffect(() => {
        setWeightValue(roundPortfolioTokensToStart());
    }, [selectedPortfolio]);
    useEffect(() => {
        setRemainingWeight(Math.round(100 - currentTotalWeight * 100));
    }, [weightValue]);

    return (
        <>
            {props.session ? (
                <div className={'content-area'}>
                    <Card>
                        <div className={styles.title_and_dropdown_container}>
                            <h3 className={styles.title}>Manage Portfolio</h3>
                            <Dropdown
                                selectedChild={DropdownText[selectedPortfolio]}
                                onClick={item => {
                                    setSelectedPortfolio(item.portfolio);
                                }}
                            >
                                {[
                                    { text: DropdownText['season_1'], portfolio: 'season_1' },
                                    { text: DropdownText['all_time'], portfolio: 'all_time' },
                                ]}
                            </Dropdown>
                        </div>
                        <div className={styles.inner_container}>
                            <div className={styles.table_container}>
                                <EditableDistributionTable
                                    props={props}
                                    selectedPortfolio={selectedPortfolio}
                                    weightValue={weightValue}
                                    setWeightValue={setWeightValue}
                                    roundPortfolioTokens={roundPortfolioTokens}
                                    addTokenRow={(item: SubstringSearchItem) => {
                                        if (
                                            weightValue.some(
                                                (i: any) => i.coingecko_id === item.coingecko_id,
                                            )
                                        ) {
                                            alert(
                                                'This coingeckoId already exists in your portfolio!',
                                            );
                                        } else {
                                            addTokenRow(item);
                                        }
                                    }}
                                    removeTokenRow={(coingeckoId: any) =>
                                        removeTokenRow(coingeckoId)
                                    }
                                />
                            </div>
                            <DraggablePieChart props={props} weightValue={weightValue} />
                        </div>
                        <h3
                            className={styles.remaining_weight}
                            style={{
                                color: remainingWeight <= 0 ? 'var(--green-10)' : 'var(--red-10)',
                            }}
                        >
                            Remaining weight: {remainingWeight}
                        </h3>
                        <div className={styles.save_button_row}>
                            <RetroButton variant="dark_purple" onClick={() => handleUpdateStats()}>
                                Save and Update Stats
                            </RetroButton>
                        </div>
                    </Card>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}
