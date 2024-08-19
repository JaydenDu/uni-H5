import classes from "./card.module.css";
import { useState } from "react";

enum CoverStyle {
    black = "black",
    white = "white",
    normal = "normal",
    diamond = "diamond",
}

type Props = {
    info: any;
    coverUrl: string;
    coverStyle: string;
    children?: React.ReactNode;
    onApply?: Function;
};

export const fit = (px: number) => {
    const sw = Math.min(window.screen.width, 430);
    const dw = 375;

    const r = sw / dw;
    return px * r;
};

const cardView = (coverStyle: string) => {
    switch (coverStyle) {
        case CoverStyle.black:
            return {
                textClass: classes.blackCard,
                applyBtnClass: classes.blackCardApplyBtn,
            };
        case CoverStyle.normal:
            return {
                textClass: "text-[#4E4C72]",
                applyBtnClass: classes.normalCardApplyBtn,
            };
        case CoverStyle.diamond:
            return {
                textClass: "text-[#6A0794]",
                applyBtnClass: classes.diamondCardApplyBtn,
            };
    }
    return {
        textClass: "text-[#787878]",
        applyBtnClass: classes.whiteCardApplyBtn,
    };
};
const Card = ({ info, coverStyle, coverUrl, children, onApply }: Props) => {
    const [show, setShow] = useState(false);
    if (info) {
        const id = info?.cardNo || "0000000000000000";
        const date = `${info?.expireMonth ?? "00"}/${info?.expireYear?.slice(-2) ?? "00"}`;
        const cvv = info?.cvv;

        const c = cardView(coverStyle);
        return (
            <div className="relative w-full h-full">
                <img className="w-full" alt="" src={coverUrl} />
                <div className="absolute left-0 top-0 w-full h-full">
                    <div className={`left-4 absolute font-semibold ${c.textClass}`} style={{ top: fit(80) }}>
                        <span className="mr-14px">{id?.slice(0, 4)}</span>
                        <span className="mr-14px">{id?.slice(4, 8)}</span>
                        <span className="mr-14px">{id?.slice(8, 12)}</span>
                        <span>{id?.slice(12, 16)}</span>
                    </div>

                    <div className="absolute left-4 bottom-3 text-xs font-medium">
                        <div className={c.textClass}>{date}</div>
                    </div>

                    {cvv && (
                        <div className="absolute right-5 top-4">
                            <div className={`flex items-center font-semibold ${c.textClass}`}>
                                <span className="font-medium text-sm">CVV:{show ? cvv : "***"} </span>
                                <button className="p-2" onClick={() => setShow(!show)}>
                                    {show ? (
                                        <div className={`w-4 h-4 i-bees-show?mask ${c.textClass}`} style={{ backgroundClip: "unset" }} />
                                    ) : (
                                        <div className={`w-4 h-4 i-bees-hidden?mask ${c.textClass}`} style={{ backgroundClip: "unset" }} />
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {onApply && (
                        <div className="absolute right-4 top-4">
                            <button
                                onClick={onApply}
                                className={`cursor-pointer py-6px pl-10px pr-6px rounded-full inline-flex items-center ${c.applyBtnClass}`}
                            >
                                <span className="text-xs font-medium">Apply Now</span>
                                <span className="block w-4 h-4 i-bees-left?mask transform rotate-180"></span>
                            </button>
                        </div>
                    )}
                </div>
                {children}
            </div>
        );
    }
    return <div className="bg-[#eee] rounded-lg w-full h-full"></div>;
};

export default Card;
