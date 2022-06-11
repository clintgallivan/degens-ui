import { useState } from 'react';
import Image, { ImageLoaderProps } from 'next/image';
import Link from 'next/link';
import { Table } from 'react-bootstrap';
import { BsAward } from 'react-icons/bs';
import { ImArrowDown2 } from 'react-icons/im';

import RetroButton from '@components/common/RetroButton';
import styles from './StatTable.module.scss';

const StatTable = ({ props }: any) => {
  const [selectedColumn, setSelectedColumn] = useState('by_degen_score');
  const [isLoading, setIsLoading] = useState(true);
  const topTokenData = props.topTokenSnapshot[0];

  const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  const RowHandler = () => {
    const unselectedColor = 'var(--white)';
    const selectedColor = 'var(--orange-20)';

    return topTokenData[selectedColumn].slice(0, 10).map((item: any) => {
      return (
        <tr key={item.name} className={styles.row_container}>
          <td>
            <div className={styles.icon_container}>
              <Image
                loader={imageLoader}
                src={item.image}
                alt=""
                height={24}
                width={24}
              />
            </div>
          </td>
          <td>
            <div className={styles.item_name_container}>
              <Link
                className={styles.a_tag}
                href={`/tokens/${item.coingecko_id}`}
              >
                <a className={styles.a_tag}>{item.name}</a>
              </Link>
            </div>
          </td>
          <td>
            <div
              className={
                selectedColumn == 'by_degen_score'
                  ? styles.grid_point_container && styles.selected_text
                  : styles.grid_point_container
              }
            >
              {item.coingecko_score_rank}
            </div>
          </td>
          <td>
            <div
              className={
                selectedColumn == 'by_developer_score'
                  ? styles.grid_point_container && styles.selected_text
                  : styles.grid_point_container
              }
            >
              {item.dev_score_rank}
            </div>
          </td>
          <td>
            <div
              className={
                selectedColumn == 'by_community_score'
                  ? styles.grid_point_container && styles.selected_text
                  : styles.grid_point_container
              }
            >
              {item.community_score_rank}
            </div>
          </td>
          <td>
            <div
              className={
                selectedColumn == 'by_liquidity_score'
                  ? styles.grid_point_container && styles.selected_text
                  : styles.grid_point_container
              }
            >
              {item.liquidity_score_rank}
            </div>
          </td>
        </tr>
      );
    });
  };
  return (
    <div className={styles.container}>
      <Table>
        <thead className={styles.head}>
          <tr className={styles.head_row}>
            <th>
              <div className={styles.head_container}>
                <BsAward size={25} />
              </div>
            </th>
            <th className="fs-l">
              <div className={styles.head_container}>Name</div>
            </th>

            <th>
              <div className={styles.grid_point_container}>
                <RetroButton
                  onClick={() => setSelectedColumn('by_degen_score')}
                >
                  {
                    <>
                      <div className="fs-xsm fw-sb">Degen</div>
                      {selectedColumn == 'by_degen_score' ? (
                        <ImArrowDown2 className={styles.arrow_icon} />
                      ) : null}
                    </>
                  }
                </RetroButton>
              </div>
            </th>
            <th>
              <div className={styles.grid_point_container}>
                <RetroButton
                  onClick={() => setSelectedColumn('by_developer_score')}
                >
                  {
                    <>
                      <div className="fs-xsm fw-sb">Developer</div>
                      {selectedColumn == 'by_developer_score' ? (
                        <ImArrowDown2 className={styles.arrow_icon} />
                      ) : null}
                    </>
                  }
                </RetroButton>
              </div>
            </th>
            <th>
              <div className={styles.grid_point_container}>
                <RetroButton
                  onClick={() => setSelectedColumn('by_community_score')}
                >
                  {
                    <>
                      <div className="fs-xsm fw-sb">Community</div>
                      {selectedColumn == 'by_community_score' ? (
                        <ImArrowDown2 className={styles.arrow_icon} />
                      ) : null}
                    </>
                  }
                </RetroButton>
              </div>
            </th>
            <th>
              <div className={styles.grid_point_container}>
                <RetroButton
                  onClick={() => setSelectedColumn('by_liquidity_score')}
                >
                  {
                    <>
                      <div className="fs-xsm fw-sb">Liquidity</div>
                      {selectedColumn == 'by_liquidity_score' ? (
                        <ImArrowDown2 className={styles.arrow_icon} />
                      ) : null}
                    </>
                  }
                </RetroButton>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className={styles.head}>{RowHandler()}</tbody>
      </Table>
    </div>
  );
};

export default StatTable;
