import ReactSlider from 'react-slider';
import styles from './Slider.module.scss';

export default function Slider() {
  const ThumbRender = (props: any, state: any) => {
    const stateVal = [
      '0',
      '10',
      '25',
      '50',
      '100',
      '200',
      '300',
      '400',
      '500',
      '600',
      '700',
      '800',
      '900',
      '1k',
      '1.5k',
      '2',
      '2.5k',
      '3k',
      '3.5k',
      '4k',
      '4.5k',
      '5k',
      '5.5k',
      '6k',
      '6.5k',
      '7k',
      '7.5k',
      '8k',
      '8.5k',
      '9k',
      '9.5k',
      '10k',
      'max',
    ];

    return (
      <div {...props}>
        <div className="example-thumb"></div>
        <div>{stateVal[state.valueNow]}</div>
      </div>
    );
  };

  return (
    <ReactSlider
      className="horizontal-slider"
      thumbClassName={styles.thumb}
      trackClassName="example-track"
      defaultValue={[0, 32]}
      ariaLabel={['Lower thumb', 'Upper thumb']}
      ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
      renderThumb={ThumbRender}
      min={0}
      max={32}
      pearling
      minDistance={1}
    />
  );
}
