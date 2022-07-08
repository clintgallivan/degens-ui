import { useState } from 'react';
import IntroSection from '@components/Home/components/IntroSection';
import Card from '@components/common/Card';
import TopTokenTable from '@components/common/TopTokenTable';
import styles from './TopTokenSection.module.scss';
import RetroButton from '@components/common/RetroButton';
import { BsFilter, BsFilterRight } from 'react-icons/bs';
import { IoFilter } from 'react-icons/io5';
import { MdFilterAlt } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { Offcanvas } from 'react-bootstrap';
import FilterAccordian from '../FilterAccordian';

export default function TopTokenSection({ props }: any) {
  const [isExpanded, setIsExpanded] = useState(true);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

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

  return (
    <>
      <div className="content-area">
        <Card header={CardHeader()}>
          <FilterAccordian isExpanded={isExpanded} props={props} />
          <TopTokenTable props={props} />
        </Card>
        {/* <RightOffCanvas placement="end" /> */}
      </div>
    </>
  );
}
