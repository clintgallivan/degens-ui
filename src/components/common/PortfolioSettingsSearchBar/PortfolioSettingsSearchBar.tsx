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
import { clientApi } from '@utils/api';

export default function PortfolioSettingsSearchBar({ props, addTokenRow }: any) {
    const [portfolioSearchIsExpanded, setPortfolioSearchIsExpanded] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const { width = 0 } = useWindowSize();
    const [results, setResults] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        // Debounce setup
        const timeoutId = setTimeout(async () => {
            try {
                const res = await clientApi.get('/api/token-list', {
                    signal,
                    params: { string: searchValue },
                });

                const sortedResults = res.data.sort(
                    (a, b) => (a.market_cap_rank || Infinity) - (b.market_cap_rank || Infinity),
                );
                setResults(sortedResults);
            } catch (e) {
                console.error(e);
                setResults([]);
            }
        }, 500); // Adjust debounce time as needed

        return () => {
            controller.abort();
            clearTimeout(timeoutId);
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
                        ? ListItems(props, results, (item: any) => addTokenRow(item))
                        : null}
                </div>
            </form>
        </>
    );
}
