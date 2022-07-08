import MultiSelectSearchBar from '@components/common/MultiSelectSearchBar';
import Slider from '@components/common/Slider';

import styles from './FilterAccordian.module.scss';

export default function FilterAccordian({ isExpanded, props }: any) {
  console.log(props);
  return (
    <div className={isExpanded ? styles.container_expanded : styles.container}>
      <div className={styles.filter_col}>
        <div className={styles.col_text}>Categories</div>
        <MultiSelectSearchBar placeholder="categories..." />
      </div>
      <div className={styles.filter_col}>
        <div className={styles.col_text}>Platforms</div>
        <MultiSelectSearchBar placeholder="platforms..." />
      </div>
      <div className={styles.filter_col}>
        <div className={styles.col_text}>Market Cap Rank</div>
        <Slider />
        {/* <MultiSelectSearchBar placeholder="platforms..." /> */}
      </div>
    </div>
  );
}
