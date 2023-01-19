import Card from '@components/common/Card';
import RetroButton from '@components/common/RetroButton';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DraggablePieChart from './components/DraggablePieChart';
import EditableDistributionTable from './components/EditableDistributionTable';
import styles from './PortfolioSection.module.scss';
import Dropdown from '@components/common/Dropdown';

export enum DropdownText {
    'season_1' = 'Season 1',
    'all_time' = 'All Time',
}
export enum DropdownTextReverse {
    'Season 1' = 'season_1',
    'All Time' = 'all_ime',
}

export default function PortfolioSection({ props }: any) {
    console.log(props);
    const router = useRouter();
    const [dropdownText, setDropdownText] = useState(DropdownText['season_1']);
    const selectedPortfolio = DropdownTextReverse[dropdownText];
    const portfolioTokens =
        props.user[0].last_updated_snapshot.portfolios[selectedPortfolio][0].tokens;
    const roundPortfolioTokens = () => {
        let output: any = [];
        const handler = () => {
            portfolioTokens.forEach(tokenObj => {
                const roundedPercent = Math.round((tokenObj.percent + Number.EPSILON) * 100) / 100;
                tokenObj.percent = roundedPercent;
                output.push(tokenObj);
            });
        };
        handler();
        return output;
    };
    const [weightValue, setWeightValue] = useState(roundPortfolioTokens());
    return (
        <>
            {props.session ? (
                <div className="content-area">
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
                            <EditableDistributionTable
                                props={props}
                                selectedPortfolio={selectedPortfolio}
                                weightValue={weightValue}
                                setWeightValue={setWeightValue}
                                roundPortfolioTokens={roundPortfolioTokens}
                            />
                            <DraggablePieChart props={props} />
                        </div>
                    </Card>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}
