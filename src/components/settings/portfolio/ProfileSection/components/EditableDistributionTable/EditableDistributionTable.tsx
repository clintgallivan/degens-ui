import Card from '@components/common/Card';

import { useEffect, useState } from 'react';
import Image, { ImageLoaderProps } from 'next/image';
import { Placeholder, Table } from 'react-bootstrap';
import { BsAward } from 'react-icons/bs';

import RetroButton from '@components/common/RetroButton';
import Link from 'next/link';
import { ImArrowDown2 } from 'react-icons/im';
import styles from './EditableDistributionTable.module.scss';
import { toFixedNumber } from '@utils/text';
import WeightOperator from '@components/common/WeightOperator';
import { parentPort } from 'worker_threads';

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
}: any) {
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
    const RowHandler = () =>
        roundPortfolioTokens().map((item: any, index: number) => (
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
                                        <a className={styles.a_tag}>{item.coingecko_id}</a>
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
                        <WeightOperator
                            props={props}
                            index={index}
                            defaultPercent={item.percent}
                            weightValue={weightValue}
                            setWeightValue={setWeightValue}
                        />
                    )}
                </td>
            </tr>
        ));

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
                                <RetroButton onClick={() => setSelectedColumn('percent')}>
                                    {selectedColumn === 'percent' ? (
                                        <>
                                            <div className={styles.selected_col_header_text}>
                                                Weight
                                            </div>
                                            <ImArrowDown2 className={styles.arrow_icon} />
                                        </>
                                    ) : (
                                        <div className={styles.unselected_col_header_text}>
                                            Weight
                                        </div>
                                    )}
                                </RetroButton>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody className={styles.head}>{RowHandler()}</tbody>
            </Table>
        </div>
    );
}

export default EditableDistributionTable;
