import { useState } from 'react';
import Image, { ImageLoaderProps } from 'next/image';
import { Placeholder, Table } from 'react-bootstrap';
import { BsAward } from 'react-icons/bs';

import RetroButton from '@components/common/RetroButton';
import styles from './TopTokenTable.module.scss';
import Link from 'next/link';
import { ImArrowDown2 } from 'react-icons/im';

type PlaceholderTextProps = {
  xs: number;
};

const TopTokenTable = ({ props, queryData, queryIsLoading }: any) => {
  console.log(queryData);
  // console.log(props.topTokenSnapshot[0]);
  const [selectedColumn, setSelectedColumn] = useState('by_degen_score');
  const [isLoading, setIsLoading] = useState(true);
  // const topTokenData = props.topTokenSnapshot[0];
  const topTokenData =
    queryData == null ? props.topTokenSnapshot[0] : queryData.data;

  const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  const PlaceholderText = ({ xs }: PlaceholderTextProps) => {
    return (
      <Placeholder animation="glow">
        <div className={styles.item_name_container}></div>
        <Placeholder xs={xs} />
      </Placeholder>
    );
  };
  const RowHandler = () => {
    return topTokenData[selectedColumn]
      .slice(0, 100)
      .map((item: any, index: number) => {
        // console.log(item);
        return (
          <tr key={item.name} className={styles.row_container}>
            <td>
              <div className={styles.icon_container}>#{index + 1}</div>
            </td>
            <td>
              <div className={styles.icon_name_container}>
                {queryIsLoading ? (
                  <PlaceholderText xs={12} />
                ) : (
                  <>
                    <div className={styles.icon_container}>
                      <Image
                        loader={imageLoader}
                        src={item.image}
                        alt=""
                        height={24}
                        width={24}
                      />
                    </div>
                    <div className={styles.item_name_container}>
                      <Link
                        className={styles.a_tag}
                        href={`/tokens/${item.coingecko_id}`}
                      >
                        <a className={styles.a_tag}>{item.name}</a>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </td>
            <td>
              {queryIsLoading ? (
                <PlaceholderText xs={4} />
              ) : (
                <div
                  className={
                    selectedColumn == 'by_degen_score'
                      ? styles.grid_point_container && styles.selected_text
                      : styles.grid_point_container && styles.unselected_text
                  }
                >
                  {item.coingecko_score_rank}
                </div>
              )}
            </td>
            <td>
              {queryIsLoading ? (
                <PlaceholderText xs={4} />
              ) : (
                <div
                  className={
                    selectedColumn == 'by_developer_score'
                      ? styles.grid_point_container && styles.selected_text
                      : styles.grid_point_container && styles.unselected_text
                  }
                >
                  {item.dev_score_rank}
                </div>
              )}
            </td>
            <td>
              {queryIsLoading ? (
                <PlaceholderText xs={4} />
              ) : (
                <div
                  className={
                    selectedColumn == 'by_community_score'
                      ? styles.grid_point_container && styles.selected_text
                      : styles.grid_point_container && styles.unselected_text
                  }
                >
                  {item.community_score_rank}
                </div>
              )}
            </td>
            <td>
              {queryIsLoading ? (
                <PlaceholderText xs={4} />
              ) : (
                <div
                  className={
                    selectedColumn == 'by_liquidity_score'
                      ? styles.grid_point_container && styles.selected_text
                      : styles.grid_point_container && styles.unselected_text
                  }
                >
                  {item.liquidity_score_rank}
                </div>
              )}
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
                      {selectedColumn == 'by_degen_score' ? (
                        <>
                          <div className={styles.selected_col_header_text}>
                            Degen
                          </div>
                          <ImArrowDown2 className={styles.arrow_icon} />
                        </>
                      ) : (
                        <div className={styles.unselected_col_header_text}>
                          Degen
                        </div>
                      )}
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
                      {selectedColumn == 'by_developer_score' ? (
                        <>
                          <div className={styles.selected_col_header_text}>
                            Developer
                          </div>
                          <ImArrowDown2 className={styles.arrow_icon} />
                        </>
                      ) : (
                        <div className={styles.unselected_col_header_text}>
                          Developer
                        </div>
                      )}
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
                      {selectedColumn == 'by_community_score' ? (
                        <>
                          <div className={styles.selected_col_header_text}>
                            Community
                          </div>
                          <ImArrowDown2 className={styles.arrow_icon} />
                        </>
                      ) : (
                        <div className={styles.unselected_col_header_text}>
                          Community
                        </div>
                      )}
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
                      {selectedColumn == 'by_liquidity_score' ? (
                        <>
                          <ImArrowDown2 className={styles.arrow_icon} />
                          <div className={styles.selected_col_header_text}>
                            Liquidity
                          </div>
                        </>
                      ) : (
                        <div className={styles.unselected_col_header_text}>
                          Liquidity
                        </div>
                      )}
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

export default TopTokenTable;
