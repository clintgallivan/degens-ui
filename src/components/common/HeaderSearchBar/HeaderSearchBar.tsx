import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { GrFormSearch } from 'react-icons/gr';
import axios from 'axios';

import useWindowSize from '@hooks/useWindowSize';
import { useLayoutContext } from '@context/layoutContext';

import ListItems from './components/Listitems';
import styles from './HeaderSearchBar.module.scss';
import { clientApi } from '@utils/api';

export default function HeaderSearchBar({ props }: any) {
    const { headerSearchIsExpanded, setHeaderSearchIsExpanded } = useLayoutContext();
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
                id="header-search"
                className={headerSearchIsExpanded ? styles.container_expanded : styles.container}
                // onClick={() =>
                //   headerSearchIsExpanded
                //     ? setHeaderSearchIsExpanded(true)
                //     : setHeaderSearchIsExpanded(true)
                // }
            >
                <FaSearch
                    id="header-search"
                    className={
                        headerSearchIsExpanded ? styles.search_icon_expanded : styles.search_icon
                    }
                    size={20}
                />
                {width >= 1024 || headerSearchIsExpanded ? (
                    <div id="header-search-col" className={styles.search_col}>
                        <div id="header-search-row" className={styles.search_row}>
                            <input
                                autoComplete="off"
                                autoCorrect="off"
                                spellCheck={false}
                                className={
                                    headerSearchIsExpanded ? styles.input_expanded : styles.input
                                }
                                autoFocus={headerSearchIsExpanded ? true : false}
                                type="text"
                                id="header-search"
                                placeholder={'Search'}
                                name="s"
                                value={headerSearchIsExpanded ? searchValue : ''}
                                onChange={e => setSearchValue(e.target.value)}
                            />

                            {headerSearchIsExpanded ? (
                                <Button
                                    // id="header-search-close-button"
                                    className={styles.x_container}
                                    variant="transparent"
                                    // onClick={() =>
                                    //   setHeaderSearchIsExpanded(!headerSearchIsExpanded)
                                    // }
                                >
                                    <IoClose size={25} fill="white" />
                                </Button>
                            ) : null}
                        </div>
                        {headerSearchIsExpanded ? (
                            <>
                                <div id="header-search-spacer" className={styles.spacer}></div>
                                {/* <div>Tokens:</div> */}
                            </>
                        ) : null}
                        {headerSearchIsExpanded ? ListItems(props, results) : null}
                    </div>
                ) : (
                    <></>
                )}
            </form>
        </>
    );
}
