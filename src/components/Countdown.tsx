import { useState, useEffect } from "react";

type Props = {
    start: number;
    max: number;
    onChange?: Function;
    onEnd?: Function;
};

export default ({ start, max, onChange, onEnd }: Props) => {
    const [current, setCurrent] = useState(Date.now());

    const result = max - Math.floor((current - start) / 1000);

    useEffect(() => {
        if (Math.floor((current - start) / 1000) < max) {
            setTimeout(() => {
                setCurrent(Date.now());
                onChange?.(result);
            }, 1000);
        } else {
            onEnd?.();
        }
    }, [current]);

    return result;
};
