import { useState } from 'react';
import IntroSection from '@components/Home/components/IntroSection';
import Card from '@components/common/Card';
import TopTokenTable from '@components/common/TopTokenTable';
import styles from './FilterAccordian.module.scss';
import RetroButton from '@components/common/RetroButton';
import { BsFilter, BsFilterRight } from 'react-icons/bs';
import { IoFilter } from 'react-icons/io5';
import { Offcanvas } from 'react-bootstrap';
import MultiSelectSearchBar from '@components/common/MultiSelectSearchBar';

export default function FilterAccordian({ isExpanded }) {
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
      <div className={styles.filter_col}></div>
    </div>
  );
}
