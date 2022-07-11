import MultiSelectSearchBar from '@components/common/MultiSelectSearchBar';
import Slider from '@components/common/Slider';

import styles from './FilterAccordian.module.scss';

export default function FilterAccordian({
  isExpanded,
  categoryOptions,
  platformOptions,
  setCategoryQueries,
  setPlatformQueries,
  setMarketCapRangeQuery,
  props,
}: any) {
  const changeHandler = (e) => {
    let output: any = [];
    e.forEach((item: any) => {
      output.push(item.value);
    });
    return output;
  };

  return (
    <div className={isExpanded ? styles.container_expanded : styles.container}>
      <div className={styles.filter_col}>
        <div className={styles.col_text}>Categories</div>
        <MultiSelectSearchBar
          placeholder="categories..."
          options={categoryOptions}
          onChange={(e) => setCategoryQueries(changeHandler(e))}
        />
      </div>
      <div className={styles.filter_col}>
        <div className={styles.col_text}>Platforms</div>
        <MultiSelectSearchBar
          placeholder="platforms..."
          options={platformOptions}
          onChange={(e) => setPlatformQueries(changeHandler(e))}
        />
      </div>
      <div className={styles.filter_col}>
        <div className={styles.col_text}>Market Cap Rank</div>
        <Slider setMarketCapRangeQuery={setMarketCapRangeQuery} />
        {/* <MultiSelectSearchBar placeholder="platforms..." /> */}
      </div>
    </div>
  );
}
