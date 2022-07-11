import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import styles from './Slider.module.scss';

const ReactSlider = dynamic(import('react-slider'), { ssr: false });

export default function Slider({ setMarketCapRangeQuery }: any) {
  const stateData = [
    { label: '0', value: 0 },
    { label: '10', value: 10 },
    { label: '25', value: 25 },
    { label: '50', value: 50 },
    { label: '100', value: 100 },
    { label: '200', value: 200 },
    { label: '300', value: 300 },
    { label: '400', value: 400 },
    { label: '500', value: 500 },
    { label: '600', value: 600 },
    { label: '700', value: 700 },
    { label: '800', value: 800 },
    { label: '900', value: 900 },
    { label: '1k', value: 1000 },
    { label: '1.5k', value: 1500 },
    { label: '2', value: 2000 },
    { label: '2.5k', value: 2500 },
    { label: '3k', value: 3000 },
    { label: '3.5k', value: 3500 },
    { label: '4k', value: 4000 },
    { label: '4.5k', value: 4500 },
    { label: '5k', value: 5000 },
    { label: '5.5k', value: 5500 },
    { label: '6k', value: 6000 },
    { label: '6.5k', value: 6500 },
    { label: '7k', value: 7000 },
    { label: '7.5k', value: 7500 },
    { label: '8k', value: 8000 },
    { label: '8.5k', value: 8500 },
    { label: '9k', value: 9000 },
    { label: '9.5k', value: 9500 },
    { label: '10k', value: 10000 },
    { label: 'max', value: 100000 },
  ];
  const ThumbRender = (props: any, state: any) => {
    return (
      <div {...props}>
        <div className="example-thumb"></div>
        <div>{stateData[state.valueNow]['label']}</div>
      </div>
    );
  };

  const handleAfterChange = (state: number[]) => {
    setMarketCapRangeQuery([
      stateData[state[0]].value,
      stateData[state[1]].value,
    ]);
  };

  return (
    <ReactSlider
      className="horizontal-slider"
      thumbClassName={styles.thumb}
      trackClassName="example-track"
      defaultValue={[0, 32]}
      ariaLabel={['Lower thumb', 'Upper thumb']}
      // ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
      ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
      onAfterChange={(state) => handleAfterChange(state)}
      renderThumb={ThumbRender}
      min={0}
      max={32}
      pearling
      minDistance={1}
    />
  );
}
