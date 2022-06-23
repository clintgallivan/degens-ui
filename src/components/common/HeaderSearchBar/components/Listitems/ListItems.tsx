import axios from 'axios';
import Image, { ImageLoaderProps } from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import styles from './ListItems.module.scss';

export default function ListItems(props: any, results: any) {
  const arr = [0, 1];
  const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  const slicedResults = results.slice(0, 10);

  return slicedResults.map((item: any) => {
    return (
      <Link
        key={item.coingecko_id}
        href={`/tokens/${item.coingecko_id}`}
        className={styles.container}
      >
        <div className={styles.row_item}>
          <div className={styles.left_side_row}>
            <Image
              className={styles.image}
              loader={imageLoader}
              src={item.image}
              alt=""
              width={20}
              height={20}
            />
            <div className={styles.text}>
              {item.iterator[0]} ({item.iterator[1]})
            </div>
          </div>
          {item.market_cap_rank ? <div>#{item.market_cap_rank}</div> : null}
        </div>
      </Link>
    );
  });
}
