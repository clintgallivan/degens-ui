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
    const value = Math.round((weightValue[index].percent + Number.EPSILON) * 100) / 100;
    const maxPercent = 1;
    const minPercent = 0;
    const longPressIncrease = useLongPress(() => handleIncrease(), 150);
    const longPressDecrease = useLongPress(() => handleDecrease(), 150);

    // const handleIncrease = () => {
    //     if (value < maxPercent) {
    //         if (index + 1 < weightValue.length) {
    //             let nextIndex = index + 1;
    //             const newState = [...weightValue];
    //             newState[index].percent = value + 0.01;
    //             if (
    //                 Math.round((weightValue[nextIndex].percent + Number.EPSILON) * 100) / 100 -
    //                     0.01 <
    //                 0
    //             ) {
    //                 // increase index, check again
    //                 nextIndex += 1;
    //                 newState[nextIndex].percent =
    //                     Math.round((weightValue[nextIndex].percent + Number.EPSILON) * 100) / 100 -
    //                     0.01;
    //             } else {
    //                 newState[nextIndex].percent =
    //                     Math.round((weightValue[nextIndex].percent + Number.EPSILON) * 100) / 100 -
    //                     0.01;
    //             }
    //             setWeightValue(newState);
    //         } else {
    //             const newState = [...weightValue];
    //             newState[index].percent = value + 0.01;
    //             newState[0].percent =
    //                 Math.round((weightValue[0].percent + Number.EPSILON) * 100) / 100 - 0.01;
    //             setWeightValue(newState);
    //         }
    //     }
    // };
    // const handleIncrease = () => {
    //     if (value < maxPercent) {
    //         if (index + 1 < weightValue.length) {
    //             const newState = [...weightValue];
    //             newState[index].percent = value + 0.01;
    //             newState[index + 1].percent =
    //                 Math.round((weightValue[index + 1].percent + Number.EPSILON) * 100) / 100 -
    //                 0.01;
    //             setWeightValue(newState);
    //         } else {
    //             const newState = [...weightValue];
    //             newState[index].percent = value + 0.01;
    //             newState[0].percent =
    //                 Math.round((weightValue[0].percent + Number.EPSILON) * 100) / 100 - 0.01;
    //             setWeightValue(newState);
    //         }
    //     }
    // };
    const handleIncrease = () => {
        if (value < maxPercent) {
            for (let i = 1; i < weightValue.length; i++) {
                if (index + i < weightValue.length) {
                    const newState = [...weightValue];
                    newState[index].percent = value + 0.01;
                    if (
                        Math.round((weightValue[index + i].percent + Number.EPSILON) * 100) / 100 -
                            0.01 <
                        0
                    ) {
                        continue;
                    }
                    newState[index + i].percent =
                        Math.round((weightValue[index + i].percent + Number.EPSILON) * 100) / 100 -
                        0.01;
                    setWeightValue(newState);
                    return;
                } else {
                    const newState = [...weightValue];
                    newState[index].percent = value + 0.01;
                    if (
                        Math.round(
                            (weightValue[index + i - weightValue.length].percent + Number.EPSILON) *
                                100,
                        ) /
                            100 -
                            0.01 <
                        0
                    ) {
                        continue;
                    }
                    newState[index + i - weightValue.length].percent =
                        Math.round(
                            (weightValue[index + i - weightValue.length].percent + Number.EPSILON) *
                                100,
                        ) /
                            100 -
                        0.01;
                    setWeightValue(newState);
                    return;
                }
            }
        }
    };
    const handleDecrease = () => {
        if (value > minPercent) {
            for (let i = 1; i < weightValue.length; i++) {
                if (index + i < weightValue.length) {
                    const newState = [...weightValue];
                    newState[index].percent = value - 0.01;
                    if (
                        Math.round((weightValue[index + i].percent + Number.EPSILON) * 100) / 100 +
                            0.01 >
                        1
                    ) {
                        continue;
                    }
                    newState[index + i].percent =
                        Math.round((weightValue[index + i].percent + Number.EPSILON) * 100) / 100 +
                        0.01;
                    setWeightValue(newState);
                    return;
                } else {
                    const newState = [...weightValue];
                    newState[index].percent = value - 0.01;
                    if (
                        Math.round(
                            (weightValue[index + i - weightValue.length].percent + Number.EPSILON) *
                                100,
                        ) /
                            100 +
                            0.01 >
                        1
                    ) {
                        continue;
                    }
                    newState[index + i - weightValue.length].percent =
                        Math.round(
                            (weightValue[index + i - weightValue.length].percent + Number.EPSILON) *
                                100,
                        ) /
                            100 +
                        0.01;
                    setWeightValue(newState);
                    return;
                }
            }
        }
    };

    return (
        <div className={styles.container}>
            <button
                className={styles.button_left}
                onClick={() => handleDecrease()}
                {...longPressDecrease}
            >
                -
            </button>
            <input
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
                // onChange={(e) => onChange(e.target.value)}
            />
            <button className={styles.button_right} onClick={handleIncrease} {...longPressIncrease}>
                +
            </button>
        </div>
    );
}
