import { useEffect } from "react";
import { Link } from "react-router-dom";
declare let t: Function;

export default () => {
    useEffect(() => {}, []);

    return (
        <div className="">
            <div className="mt-70px">
                <div className="flex flex-col items-center">
                    <div className="w-[50px] h-[50px] i-bees-ok" />
                    <div className="text-center text-[#1AAD19] text-base mt-3">{t("successful")}</div>
                </div>
                <div className="text-center text-[#666] text-sm mt-5">{t("pleaseAllowMoment")}</div>
            </div>
            <div className="mt-15 flex px-4">
                <Link to="/Card" className="flex-1 flex items-center justify-center h-12 rounded-lg border border-[#FFAC13] text-[#FFAC13] mr-5">
                    {t("homePage")}
                </Link>
                <a
                    target="_blank"
                    href="https://bee-network.notion.site/Coin50ETF-Bee-Card-Privacy-Policy-Terms-Of-Use-e225c22c33914bcbb630b13f41cf48c0?pvs=74"
                    className="flex-1 flex items-center justify-center h-12 rounded-lg bg-[#FFAC13] text-white"
                >
                    {t("guideBook")}
                </a>
            </div>
        </div>
    );
};
