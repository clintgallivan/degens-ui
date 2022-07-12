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
    { label: 'max', value: 9999999 },
  ];
  const stateDataCount = stateData.length - 1;

  const ThumbRender = (props: any, state: any) => {
    return (
      <div {...props}>
        <div className="example-thumb"></div>
        <div>{stateData[state.valueNow]['label']}</div>
      </div>
    );
  };

  const handleAfterChange = (state: any) => {
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
      defaultValue={[0, stateDataCount]}
      ariaLabel={['Lower thumb', 'Upper thumb']}
      ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
      onAfterChange={(state: any) => handleAfterChange(state)}
      renderThumb={ThumbRender}
      min={0}
      max={stateDataCount}
      pearling
      minDistance={1}
    />
  );
}
