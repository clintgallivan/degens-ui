import { useState, useEffect } from 'react';

export default function useLongPress(callback = () => {}, initialMs = 300) {
    const [startLongPress, setStartLongPress] = useState(false);
    const [ms, setMs] = useState(initialMs);
    let timerId: any;

    useEffect(() => {
        if (startLongPress) {
            timerId = setTimeout(() => {
                callback();
                setMs(prevMs => Math.max(50, prevMs * 0.9)); // Decrease delay by 10%, no less than 50ms
            }, ms);
        } else {
            clearTimeout(timerId);
            setMs(initialMs); // Reset delay
        }

        return () => {
            clearTimeout(timerId);
        };
    }, [callback, ms, startLongPress]);

    return {
        onMouseDown: () => setStartLongPress(true),
        onMouseUp: () => setStartLongPress(false),
        onMouseLeave: () => setStartLongPress(false),
        onTouchStart: () => setStartLongPress(true),
        onTouchEnd: () => setStartLongPress(false),
    };
}
