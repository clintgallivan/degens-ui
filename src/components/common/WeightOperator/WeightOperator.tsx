import useLongPress from '@hooks/useLongPress';
import { toFixedNumber } from '@utils/text';
import { useState } from 'react';
import styles from './WeightOperator.module.scss';

export default function WeightOperator({
    props,
    index,
    defaultPercent,
    weightValue,
    setWeightValue,
}: any) {
    // const value = Math.round((weightValue[index].percent + Number.EPSILON) * 100) / 100;
    const value = weightValue[index].percent;
    const maxPercent = 1;
    const minPercent = 0;
    const longPressIncrease = useLongPress(() => handleIncrease(), 150);
    const longPressDecrease = useLongPress(() => handleDecrease(), 150);
    const [increaseDisabled, setIncreaseDisabled] = useState(false);
    const [decreaseDisabled, setDecreaseDisabled] = useState(false);

    const currentTotalWeight = parseFloat(
        weightValue.reduce((sum: any, item: { percent: any }) => sum + item.percent, 0).toFixed(2),
    );

    const handleIncrease = () => {
        if (currentTotalWeight >= 1) {
            return;
        }

        setWeightValue(
            weightValue.map((item: any, i: any) =>
                i === index ? { ...item, percent: parseFloat((value + 0.01).toFixed(2)) } : item,
            ),
        );
    };

    const handleDecrease = () => {
        if (currentTotalWeight <= 0) {
            return;
        }

        if (value > minPercent) {
            setWeightValue(
                weightValue.map((item: any, i: any) =>
                    i === index
                        ? { ...item, percent: parseFloat((value - 0.01).toFixed(2)) }
                        : item,
                ),
            );
        }
    };
    // * replace the div with the input when its working
    return (
        <div className={styles.container}>
            <button
                className={styles.button_left}
                onClick={() => handleDecrease()}
                {...longPressDecrease}
            >
                -
            </button>

            <div className={styles.input_div}>{toFixedNumber(value * 100)}</div>
            {/* <input
                className={styles.input}
                // defaultValue={toFixedNumber(defaultPercent * 100, 2)}
                value={toFixedNumber(value * 100)}
                type="string"
                name="name"
                // onChange={e =>
                //     setWeightValue([
                //         ...weightValue,
                //         (weightValue[index].percent = e.target.value / 100),
                //     ])
                // }
                onChange={e => onChange(e.target.value)}
            /> */}
            <button className={styles.button_right} onClick={handleIncrease} {...longPressIncrease}>
                +
            </button>
        </div>
    );
}
