import Card from '@components/common/Card';
import { useRouter } from 'next/router';
import { useState } from 'react';
import DraggablePieChart from './components/DraggablePieChart';
import EditableDistributionTable from './components/EditableDistributionTable';
import styles from './PortfolioSection.module.scss';
import Dropdown from '@components/common/Dropdown';
import RetroButton from '@components/common/RetroButton';
import axios from 'axios';

export enum DropdownText {
    'season_1' = 'Season 1',
    'all_time' = 'All Time',
}
export enum DropdownTextReverse {
    'Season 1' = 'season_1',
    'All Time' = 'all_time',
}

export default function PortfolioSection({ props }: any) {
    const router = useRouter();
    const [dropdownText, setDropdownText] = useState(DropdownText['season_1']);
    const selectedPortfolio = DropdownTextReverse[dropdownText];
    const portfolioTokens =
        props.user[0].last_updated_snapshot.portfolios[selectedPortfolio][0].tokens;
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
    const [weightValue, setWeightValue] = useState(roundPortfolioTokens());
    const addTokenRow = (coingeckoId, name, imageUrl) => {
        console.log(weightValue);
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
    const handleUpdateStats = async () => {
        console.log('start api');
        try {
            const historical: any = {
                portfolios: {},
            };
            Object.keys(portfolios).forEach(portfolio => {
                const pKey = portfolio;
                const pValue = portfolios[portfolio];
                historical.portfolios[pKey] = [pValue[0]];
            });
            console.log('second');
            // const res = await axios.post(
            //     '/api/handle-update-stats',
            //     {
            //         uid: props.user[0].uid,
            //         portfolio_metadata: props.user[0].portfolio_metadata,
            //         historical,
            //     },
            //     {
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //     },
            // );
            // console.log(res);
            // res.status === 200 ? refreshData() : log('failed to update');
        } catch (e) {
            log(e);
        }
    };

    return (
        <>
            {props.session ? (
                <div className={'content-area'}>
                    <Card>
                        <div className={styles.title_and_dropdown_container}>
                            <h3 className={styles.title}>Manage Portfolio</h3>
                            <Dropdown
                                selectedChild={dropdownText}
                                onClick={item => setDropdownText(item.text)}
                            >
                                {[
                                    { text: DropdownText['season_1'] },
                                    { text: DropdownText['all_time'] },
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
                                    addTokenRow={(coingeckoId, name, imageURL) =>
                                        addTokenRow(coingeckoId, name, imageURL)
                                    }
                                />
                            </div>
                            <DraggablePieChart props={props} weightValue={weightValue} />
                        </div>
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
