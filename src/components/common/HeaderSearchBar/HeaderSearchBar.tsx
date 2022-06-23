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

export default function HeaderSearchBar({ props }: any) {
  const { headerSearchIsExpanded, setHeaderSearchIsExpanded } =
    useLayoutContext();
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

        arr = arr.sort(
          (a: any, b: any) => a.market_cap_rank - b.market_cap_rank
        );
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
        id="header-search"
        className={
          headerSearchIsExpanded ? styles.container_expanded : styles.container
        }
        // onClick={() =>
        //   headerSearchIsExpanded
        //     ? setHeaderSearchIsExpanded(true)
        //     : setHeaderSearchIsExpanded(true)
        // }
      >
        <FaSearch
          id="header-search"
          className={
            headerSearchIsExpanded
              ? styles.search_icon_expanded
              : styles.search_icon
          }
          size={20}
        />
        {width >= 768 || headerSearchIsExpanded ? (
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
                onChange={(e) => setSearchValue(e.target.value)}
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
