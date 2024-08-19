import { Children, ReactNode, useEffect, useRef, useState } from "react";

type Props = {
    value: number;
    children: ReactNode[];
    onChange: (value: number) => void;
};

const md = 768;

const getAutoWidth = (count: number, padding: number, maxWidth: number, bulge: number) => {
    const sw = window.screen.width;
    const defaultWidth = sw - 2 * padding;
    const w = count > 1 ? defaultWidth - bulge : defaultWidth;
    if (sw > md) return maxWidth;
    return w;
};
const Swipe = ({ value, children, onChange }: Props) => {
    const timerRef = useRef(0);
    const itemRef = useRef(null);
    const sxRef = useRef(0);
    const dxRef = useRef(0);
    const indexRef = useRef(0);
    const [dx, setDx] = useState(0);
    const count = Children.count(children);
    const bulge = 40;
    const maxWidth = 343;
    const padding = 16;
    const gap = 0;
    const itemWidth = getAutoWidth(count, padding, maxWidth, bulge);

    const getIndex = () => {
        const oldDx = dxRef.current;
        const index = indexRef.current;
        const length = Children.count(children);

        let i = index;
        if (dx - oldDx < 0) {
            if (index + 1 < length) i = index + 1;
        } else if (dx - oldDx > 0) {
            if (index - 1 >= 0) i = index - 1;
        }
        return i;
    };

    const getMove = (i: number) => {
        const tv = i * itemWidth - bulge / 2;
        return i === 0 ? 0 : -tv;
    };

    const moveTo = (i: number) => {
        timerRef.current && clearTimeout(timerRef.current);
        const tv = getMove(i);

        const b = dx;
        const c = tv - b;
        const d = 800;

        const step = (t: number, bt: number, f: Function) => {
            const value = expoEaseOut(t, b, c, d);
            const nt = Date.now() - bt;
            if (nt <= d) {
                f(value);
                timerRef.current = setTimeout(() => step(nt, bt, f), 17);
            } else {
                f(tv);
            }
        };

        onChange(i);
        const setValue = (v: number) => {
            setDx(v);
            dxRef.current = v;
        };
        step(0, Date.now(), setValue);
        indexRef.current = i;
    };

    const onTouchMove = (e: any) => {
        const cx = e.touches[0].clientX;
        const px = sxRef.current ?? cx;
        const dx_ = cx - px;
        setDx(dx_);
    };
    const onTouchStart = (e: any) => {
        const sx = e.touches[0].clientX;
        sxRef.current = sx - dx;
        timerRef.current && clearTimeout(timerRef.current);
    };
    const onTouchEnd = (e: any) => {
        if (dxRef.current === dx) return;
        const i = getIndex();

        moveTo(i);
    };

    const next = () => {
        const i = Math.min(indexRef.current + 1, count - 1);
        moveTo(i);
    };

    const prev = () => {
        const i = Math.max(indexRef.current - 1, 0);
        moveTo(i);
    };

    useEffect(() => {
        const tv = getMove(value);

        setDx(tv);
        dxRef.current = tv;
        indexRef.current = value;
    }, [value]);

    return (
        <div className="overflow-hidden relative" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
            <div className="flex pl-4 pr-1" style={{ transform: `translateX(${dx}px)` }}>
                {Children.map(children, (child, i) => {
                    const isSelected = i === indexRef.current;
                    return (
                        <div ref={itemRef} className={`flex-1 `} style={{ marginRight: gap + "px" }}>
                            <div className={`transform transition-transform duration-500 ${isSelected ? "" : "scale-92 "}`} style={{ width: itemWidth }}>
                                {child}
                            </div>
                        </div>
                    );
                })}
            </div>
            {count > 1 && (
                <>
                    <button onClick={prev} className="w-10 h-10 absolute top-1/2 -mt-5 left-2 bg-[#0303034d] rounded-full flex justify-center items-center">
                        <div className="w-5 h-5 i-bees-left?mask text-white"></div>
                    </button>
                    <button onClick={next} className="w-10 h-10 absolute top-1/2 -mt-5 right-2 bg-[#0303034d] rounded-full flex justify-center items-center">
                        <div className="w-5 h-5 i-bees-left?mask transform rotate-180 text-white"></div>
                    </button>
                </>
            )}
        </div>
    );
};

/**
 *
 * @param {*} t current time
 * @param {*} b beginning value
 * @param {*} c change in value
 * @param {*} d duration
 * @description https://github.com/zhangxinxu/Tween/blob/master/tween.js
 */
const expoEaseOut = (t: number, b: number, c: number, d: number) => {
    return t == d ? b + c : c * (-Math.pow(2, (-10 * t) / d) + 1) + b;
};

export default Swipe;
