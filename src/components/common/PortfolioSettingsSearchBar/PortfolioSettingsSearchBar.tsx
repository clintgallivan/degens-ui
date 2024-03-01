import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaSearch, FaPlus } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { GrFormSearch } from 'react-icons/gr';
import axios from 'axios';

import useWindowSize from '@hooks/useWindowSize';
import { useLayoutContext } from '@context/layoutContext';

import ListItems from './components/Listitems';
import styles from './PortfolioSettingsSearchBar.module.scss';

export default function PortfolioSettingsSearchBar({ props, addTokenRow }: any) {
    const [portfolioSearchIsExpanded, setPortfolioSearchIsExpanded] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const { width = 0 } = useWindowSize();
    const [results, setResults] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const handleSubstrQuery = async () => {
            try {
                const res = await axios.get('/api/token-list', {
                    signal,
                    params: { string: searchValue },
                });
                let arr = [];
                let arrFinal = [];
                let arrNull: any = [];
                let arrNotNull: any = [];
                arr = res.data;

                arr = arr.sort((a: any, b: any) => a.market_cap_rank - b.market_cap_rank);
                arr.forEach((item: any) => {
                    if (!item.market_cap_rank) {
                        arrNull.push(item);
                    } else {
                        arrNotNull.push(item);
                    }
                });

                arrFinal = arrNotNull.concat(arrNull);
                setResults(arrFinal);
                return;
            } catch (e) {
                setResults([]);
                return;
            }
        };
        handleSubstrQuery();
        return () => {
            controller.abort();
        };
    }, [searchValue]);

    return (
        <>
            <form
                id="portfolio-search"
                className={portfolioSearchIsExpanded ? styles.container_expanded : styles.container}
                onClick={() =>
                    portfolioSearchIsExpanded
                        ? setPortfolioSearchIsExpanded(false)
                        : setPortfolioSearchIsExpanded(true)
                }
                // onClick={() =>
                //     portfolioSearchIsExpanded
                //         ? setPortfolioSearchIsExpanded(true)
                //         : setPortfolioSearchIsExpanded(false)
                // }
            >
                <FaPlus
                    id="portfolio-search"
                    className={
                        portfolioSearchIsExpanded ? styles.search_icon_expanded : styles.search_icon
                    }
                    size={20}
                />
                <div id="portfolio-search-col" className={styles.search_col}>
                    <div id="portfolio-search-row" className={styles.search_row}>
                        <input
                            autoComplete="off"
                            autoCorrect="off"
                            spellCheck={false}
                            className={
                                portfolioSearchIsExpanded ? styles.input_expanded : styles.input
                            }
                            autoFocus={portfolioSearchIsExpanded ? true : false}
                            type="text"
                            id="portfolio-search"
                            placeholder={'Add Token'}
                            name="s"
                            value={portfolioSearchIsExpanded ? searchValue : ''}
                            onChange={e => setSearchValue(e.target.value)}
                        />

                        {portfolioSearchIsExpanded ? (
                            <Button
                                // id="portfolio-search-close-button"
                                className={styles.x_container}
                                variant="transparent"
                                // onClick={() =>
                                //   setPortfolioSearchIsExpanded(!portfolioSearchIsExpanded)
                                // }
                            >
                                <IoClose size={25} fill="white" />
                            </Button>
                        ) : null}
                    </div>
                    {portfolioSearchIsExpanded ? (
                        <>
                            <div id="portfolio-search-spacer" className={styles.spacer}></div>
                            {/* <div>Tokens:</div> */}
                        </>
                    ) : null}
                    {portfolioSearchIsExpanded
                        ? ListItems(props, results, item => addTokenRow(item))
                        : null}
                </div>
            </form>
        </>
    );
}
