import { useEffect, useState } from 'react';
import Card from '@components/common/Card';
import TopTokenTable from '@components/common/TopTokenTable';
import styles from './TopTokenSection.module.scss';
import RetroButton from '@components/common/RetroButton';
import { MdFilterAlt } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import FilterAccordian from '../FilterAccordian';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function TopTokenSection({ props }: any) {
  const router = useRouter();
  const { category } = router.query;
  const [isExpanded, setIsExpanded] = useState(true);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [platformOptions, setPlatformOptions] = useState([]);
  const [categoryQueries, setCategoryQueries] = useState(
    category ? [category] : []
  );

  console.log(categoryQueries);
  console.log(category);
  const [platformQueries, setPlatformQueries] = useState([]);
  const [marketCapRangeQuery, setMarketCapRangeQuery] = useState([0, 9999999]);
  const [queryData, setQueryData] = useState(null);
  const [queryIsLoading, setQueryIsLoading] = useState(false);

  const handleFilterLoad = async () => {
    try {
      const res = await axios.get('/api/token-filters', {});
      const data = res.data[0];
      setCategoryOptions(data.categories);
      setPlatformOptions(data.platforms);
      return;
    } catch (e) {
      return;
    }
  };

  const fetchDataTable = async (
    marketCapMin?: number,
    marketCapMax?: number
  ) => {
    setQueryIsLoading(true);
    try {
      const res: any = await axios.get('/api/leaderboard-query', {
        params: {
          categories: categoryQueries,
          platforms: platformQueries,
          marketCapRange: marketCapRangeQuery,
        },
      });
      setQueryData(res);
      setQueryIsLoading(false);
    } catch (e) {
      setQueryIsLoading(false);
      return;
    }
  };

  const CardHeader = () => {
    return (
      <div className={styles.header_row}>
        <div className={styles.header_text}>Top Token Charts</div>
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className={styles.filter_btn}
        >
          <RetroButton>
            {isExpanded ? (
              <IoClose size={24} color="black" />
            ) : (
              <MdFilterAlt size={24} color="black" />
            )}
          </RetroButton>
        </div>
      </div>
    );
  };

  useEffect(() => {
    handleFilterLoad();
  }, []);

  useEffect(() => {
    if (
      categoryQueries.length !== 0 ||
      platformQueries.length !== 0 ||
      marketCapRangeQuery[0] !== 0 ||
      marketCapRangeQuery[1] !== 9999999
    ) {
      fetchDataTable();
    } else {
      setQueryData(null);
    }
  }, [categoryQueries, platformQueries, marketCapRangeQuery]);

  return (
    <>
      <div className="content-area">
        <Card header={CardHeader()}>
          <FilterAccordian
            props={props}
            isExpanded={isExpanded}
            categoryOptions={categoryOptions}
            platformOptions={platformOptions}
            categoryQueries={categoryQueries}
            setCategoryQueries={setCategoryQueries}
            setPlatformQueries={setPlatformQueries}
            setMarketCapRangeQuery={setMarketCapRangeQuery}
          />
          <TopTokenTable
            props={props}
            queryData={queryData}
            queryIsLoading={queryIsLoading}
          />
        </Card>
      </div>
    </>
  );
}
