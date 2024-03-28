import Card from '@components/common/Card';

import { useCallback, useEffect, useState } from 'react';
import Image, { ImageLoaderProps } from 'next/image';
import { Placeholder, Table } from 'react-bootstrap';
import { BsArrowDownCircle, BsArrowUpCircle, BsTrash } from 'react-icons/bs';

// import { MdKeyboardDoubleArrowUp } from 'react-icons/md';

import RetroButton from '@components/common/RetroButton';
import Link from 'next/link';
import { ImArrowDown2 } from 'react-icons/im';
import styles from './EditableDistributionTable.module.scss';
import { toFixedNumber } from '@utils/text';
import WeightOperator from '@components/common/WeightOperator';
import { parentPort } from 'worker_threads';
import PortfolioSettingsSearchBar from '@components/common/PortfolioSettingsSearchBar';

type PlaceholderTextProps = {
    xs: number;
};

function EditableDistributionTable({
    props,
    queryData,
    queryIsLoading,
    selectedPortfolio,
    weightValue,
    setWeightValue,
    roundPortfolioTokens,
    addTokenRow,
    removeTokenRow,
}: any) {
    const lastUpdatedTokens = props.user[0].historical.portfolios[selectedPortfolio][0].tokens;
    const imageLoader = ({ src, width, quality }: ImageLoaderProps) =>
        `${src}?w=${width}&q=${quality || 75}`;
    const [selectedColumn, setSelectedColumn] = useState('percent');
    const [isLoading, setIsLoading] = useState(true);

    function PlaceholderText({ xs }: PlaceholderTextProps) {
        return (
            <Placeholder animation="glow">
                <div className={styles.item_name_container} />
                <Placeholder xs={xs} />
            </Placeholder>
        );
    }

    const RowHandler = () => {
        const rows: JSX.Element[] = [];
        weightValue.forEach((item: any, index: number) => {
            const newTokenPercent = item.percent;
            const oldTokenPercent =
                lastUpdatedTokens.find((i: any) => i.coingecko_id === item.coingecko_id)?.percent ||
                0;
            const oldTokenPercentRounded =
                Math.round((oldTokenPercent + Number.EPSILON) * 100) / 100;
            const differencePercent = newTokenPercent - oldTokenPercentRounded;
            const differencePercentRounded = Math.round((differencePercent + Number.EPSILON) * 100);

            const weightChangeHandler = () => {
                if (differencePercentRounded !== 0) {
                    return `${Math.abs(differencePercentRounded)}%`;
                }
            };
            const row = (
                <tr key={item.name} className={styles.row_container}>
                    {/* <td>
                    <div className={styles.icon_container}>#{index + 1}</div>
                </td> */}
                    <td>
                        <div className={styles.icon_name_container}>
                            {queryIsLoading ? (
                                <PlaceholderText xs={12} />
                            ) : (
                                <>
                                    <div className={styles.icon_container}>
                                        <Image
                                            loader={imageLoader}
                                            // src={item.image}
                                            src={`${item.image}`}
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
                                            {item.coingecko_id}
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </td>
                    <td>
                        <div className={styles.value_change_container}>
                            {queryIsLoading ? (
                                <PlaceholderText xs={12} />
                            ) : (
                                <>
                                    <div className={styles.icon_container}>
                                        {newTokenPercent > oldTokenPercentRounded && (
                                            <BsArrowUpCircle size={24} color="var(--green-10)" />
                                        )}
                                        {newTokenPercent < oldTokenPercentRounded && (
                                            <BsArrowDownCircle size={24} color="var(--red-10)" />
                                        )}
                                    </div>
                                    <div className={styles.value_change_text_container}>
                                        <div
                                            className={styles.value_change_text}
                                            style={{
                                                color:
                                                    differencePercentRounded > 0
                                                        ? 'var(--green-10)'
                                                        : 'var(--red-10)',
                                            }}
                                        >
                                            {weightChangeHandler()}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </td>
                    <td className={styles.table_cell_weight}>
                        <div className={styles.weight_content_container}>
                            {queryIsLoading ? (
                                <PlaceholderText xs={4} />
                            ) : (
                                <WeightOperator
                                    props={props}
                                    index={index}
                                    defaultPercent={item.percent}
                                    weightValue={weightValue}
                                    setWeightValue={setWeightValue}
                                />
                            )}
                        </div>
                    </td>
                    <td className={styles.table_cell_weight}>
                        <RetroButton
                            variant="purple"
                            onClick={() => removeTokenRow(item.coingecko_id)}
                        >
                            <BsTrash size={20} className={styles.icon} />
                        </RetroButton>
                    </td>
                </tr>
            );
            rows.push(row);
        });
        return rows;
    };

    return (
        <div className={styles.container}>
            <Table>
                <thead className={styles.head}>
                    <tr className={styles.head_row}>
                        {/* <th>
                            <div className={styles.head_container}>
                                <BsAward size={25} />
                            </div>
                        </th> */}
                        <th className="fs-l">
                            <div className={styles.head_container}>Name</div>
                        </th>
                        <th></th>
                        <th>
                            <div className={styles.grid_point_container}>
                                <RetroButton onClick={() => setSelectedColumn('percent')} disabled>
                                    {selectedColumn === 'percent' ? (
                                        <>
                                            <div className={styles.selected_col_header_text}>
                                                Weight
                                            </div>
                                            {/* <ImArrowDown2 className={styles.arrow_icon} /> */}
                                        </>
                                    ) : (
                                        <div className={styles.unselected_col_header_text}>
                                            Weight
                                        </div>
                                    )}
                                </RetroButton>
                            </div>
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className={styles.head}>
                    {RowHandler()}
                    <tr key={'portfolio-search'} className={styles.row_container}>
                        <td className={styles.search_td}>
                            <div className={styles.icon_name_container}>
                                {queryIsLoading ? (
                                    <PlaceholderText xs={12} />
                                ) : (
                                    <>
                                        <div className={styles.item_search_container}>
                                            <PortfolioSettingsSearchBar
                                                props={props}
                                                addTokenRow={(item: any) => addTokenRow(item)}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </td>
                        {/* <td>
                            <div className={styles.grid_point_container}></div>
                        </td> */}
                    </tr>
                </tbody>
                {/* <tbody className={styles.head}>
                    <tr key={'a'} className={styles.row_container}>
                        <td>
                            <div className={styles.icon_container}>
                                <PortfolioSettingsSearchBar props={props} />
                            </div>
                        </td>
                    </tr>
                </tbody> */}
            </Table>
        </div>
    );
}

export default EditableDistributionTable;
