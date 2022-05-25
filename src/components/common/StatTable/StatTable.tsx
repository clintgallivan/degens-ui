import { useState } from 'react';
import { Table } from 'react-bootstrap';
import RetroButton from '../RetroButton';
import Image from 'next/image';
import { BsAward } from 'react-icons/bs';
import styles from './StatTable.module.scss';

const StatTable = ({ props }) => {
  const [selectedColumn, setSelectedColumn] = useState('by_degen_score');
  const [isLoading, setIsLoading] = useState(true);
  const topTokenData = props.topTokenSnapshot[0];

  const RowHandler = () => {
    let count = 0;
    return topTokenData[selectedColumn].map((item) => {
      if (count < 5) {
        count++;
        return (
          <tr className={styles.row_container}>
            <td>
              <div className={styles.icon_container}>
                <img src={item.image} height={24} width={24} />
              </div>
            </td>
            <td>
              <div className={styles.item_name_container}>{item.name}</div>
            </td>
            <td>
              <div className={styles.grid_point_container}>
                {item.coingecko_score_rank}
              </div>
            </td>
            <td>
              <div className={styles.grid_point_container}>
                {item.dev_score_rank}
              </div>
            </td>
            <td>
              <div className={styles.grid_point_container}>
                {item.community_score_rank}
              </div>
            </td>
            <td>
              <div className={styles.grid_point_container}>
                {item.liquidity_score_rank}
              </div>
            </td>
          </tr>
        );
      } else {
        return <></>;
      }
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
                  children={<div className="fs-xsm fw-sb">Degen</div>}
                />
              </div>
            </th>
            <th>
              <div className={styles.grid_point_container}>
                <RetroButton
                  onClick={() => setSelectedColumn('by_developer_score')}
                  children={<div className="fs-xsm fw-sb">Developer</div>}
                />
              </div>
            </th>
            <th>
              <div className={styles.grid_point_container}>
                <RetroButton
                  onClick={() => setSelectedColumn('by_community_score')}
                  children={<div className="fs-xsm fw-sb">Community</div>}
                />
              </div>
            </th>
            <th>
              <div className={styles.grid_point_container}>
                <RetroButton
                  onClick={() => setSelectedColumn('by_liquidity_score')}
                  children={<div className="fs-xsm fw-sb">Liquidity</div>}
                />
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
