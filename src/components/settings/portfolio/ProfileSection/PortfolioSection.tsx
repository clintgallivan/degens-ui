import Card from '@components/common/Card';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DraggablePieChart from './components/DraggablePieChart';
import EditableDistributionTable from './components/EditableDistributionTable';
import styles from './PortfolioSection.module.scss';
import Dropdown from '@components/common/Dropdown';
import RetroButton from '@components/common/RetroButton';
import axios from 'axios';

export type Portfolio = 'season_1' | 'all_time';

export enum DropdownText {
    'season_1' = 'Season 1',
    'all_time' = 'All Time',
}

export default function PortfolioSection({ props }: any) {
    const router = useRouter();
    const now: any = new Date();
    const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio>('season_1');
    const { portfolios } = props.user[0].historical;
    const portfolioTokens = props.user[0].historical.portfolios[selectedPortfolio][0].tokens;
    const roundPortfolioTokens = () => {
        let output: any = [];
        const handler = () => {
            portfolioTokens.forEach((tokenObj: any) => {
                console.log('+++++');
                console.log(tokenObj.percent);
                const roundedPercent = Math.round((tokenObj.percent + Number.EPSILON) * 100) / 100;
                tokenObj.percent = roundedPercent;
                output.push(tokenObj);
            });
        };
        handler();
        return output;
    };
    const [weightValue, setWeightValue] = useState(roundPortfolioTokens());

    const currentTotalWeight = parseFloat(
        weightValue.reduce((sum, item) => sum + item.percent, 0).toFixed(2),
    );
    const remainingWeight = Math.round(100 - currentTotalWeight * 100);

    const addTokenRow = (coingeckoId, name, imageUrl) => {
        const newState = [...weightValue];
        newState[weightValue.length] = {
            coingecko_id: coingeckoId,
            image: imageUrl,
            mcap_rank: 0,
            percent: 0,
            price: 0,
        };
        setWeightValue(newState);
    };

    const removeTokenRow = coingeckoId => {
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
        const lastUpdatedAt: any = new Date(
            props.user[0].historical.portfolios[selectedPortfolio][1].timestamp,
        );
        const lastUpdatedAsDate: any = new Date(lastUpdatedAt);
        const tenMinutes = (60 * 60 * 1000) / 6;
        // TODO fix this today feb/29
        // console.log(now);
        // console.log(lastUpdatedAsDate);
        // console.log(now - lastUpdatedAsDate);
        // console.log(tenMinutes);
        if (now - lastUpdatedAsDate < tenMinutes) {
            alert(
                `Sorry, you will have to wait ${
                    now - lastUpdatedAsDate
                } before updating again. Thanks for your understanding.`,
            );
            return;
        }

        if (remainingWeight != 0) {
            alert('Please make sure you have allocated all your remaining weight.');
            return;
        }
        // TODO comment this back in when ready to work on api call
        // try {
        //     const historical: any = {
        //         portfolios: {},
        //     };
        //     Object.keys(portfolios).forEach(portfolio => {
        //         if (portfolio === selectedPortfolio) {
        //             const pKey = portfolio;
        //             const pValue = portfolios[portfolio];
        //             historical.portfolios[pKey] = [pValue[0]];
        //         }
        //     });
        //     console.log('start api call');
        //     const res = await axios.post(
        //         '/api/handle-update-stats',
        //         {
        //             uid: props.user[0].uid,
        //             portfolio_metadata: props.user[0].portfolio_metadata,
        //             historical,
        //         },
        //         {
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //         },
        //     );
        //     console.log(res);
        //     res.status === 200 ? refreshData() : log('failed to update');
        // } catch (e) {
        //     log(e);
        // }
    };

    useEffect(() => {
        setWeightValue(roundPortfolioTokens());
    }, [selectedPortfolio]);

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
                                    addTokenRow={(coingeckoId, name, imageURL) => {
                                        if (
                                            weightValue.some(
                                                item => item.coingecko_id === coingeckoId,
                                            )
                                        ) {
                                            alert(
                                                'This coingeckoId already exists in your portfolio!',
                                            );
                                        } else {
                                            addTokenRow(coingeckoId, name, imageURL);
                                        }
                                    }}
                                    removeTokenRow={coingeckoId => removeTokenRow(coingeckoId)}
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
