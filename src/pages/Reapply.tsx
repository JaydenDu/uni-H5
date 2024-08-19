import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { getRights, multipleApply } from "../request/home";
import Card from "./Card/Card";
import { CardState } from "./Apply/const";
import Button from "../components/Button";
import { message } from "../components/Message";
import { cache } from "../helpers/cache";
import numeral from "numeral";
import BackButton from "../components/BackButton";
import { getLanguage } from "../components/i18n";
import { CardType, getPropagation } from "./Home";

declare let t: Function;

const Reapply = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const rightsId = Number(id);
    const [right, setRight] = useState<any>();
    const [loading, setLoading] = useState(false);

    const go = async () => {
        setLoading(true);
        try {
            const result = await multipleApply(rightsId);
            if (result?.code === 200) {
                navigate(`/Apply/${rightsId}`, { state: { card: CardState.apply_passed, id: result?.data?.id } });
            } else {
                message.error(result?.message);
            }
        } catch (error) {
            message.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRights = async () => {
        cache(
            `getRights-${rightsId}`,
            () => getRights(rightsId),
            (result: any) => {
                if (result?.data) {
                    setRight(result?.data);
                }
            }
        );
    };
    const monthFeeView = () => {
        if (right?.monthFee == 0 && right?.beforeDiscountMonthFee > 0) {
            return (
                <div className="mb-1 h-5 flex items-center relative">
                    <span className="text-black text-sm font-medium relative">
                        {numeral(right?.beforeDiscountMonthFee).format("0,0.00")} USD * 12
                        <div className="h-1px absolute w-full top-9px bg-[#000]"></div>
                    </span>
                    <div className="i-bees-limited h-15px w-65px absolute -top-12px left-0" />
                </div>
            );
        }
        if (right?.monthFee == 0 && right?.beforeDiscountMonthFee == 0) {
            return (
                <div className="mb-1 h-5 flex items-center justify-end relative text-right">
                    <span className="text-red-500 text-sm font-medium relative text-right">{t("free")}</span>
                </div>
            );
        }
        return (
            <div className="mb-1 h-5 flex items-center relative">
                <span className="text-black text-sm font-medium relative">{numeral(right?.monthFee).format("0,0.00")} USD * 12</span>
            </div>
        );
    };

    const openFeeView = () => {
        if (right?.beforeDiscountOpenCardFee != right?.openCardFee) {
            return (
                <div className="flex items-baseline">
                    <div className="mr-6px">
                        <span className="text-black text-2xl font-bold mr-1">{numeral(right?.openCardFee).format("0,0.00")}</span>
                        <span className="text-black text-xs font-medium">USDT</span>
                    </div>
                    <div className="text-xs text-[#666] relative">
                        {numeral(right?.beforeDiscountOpenCardFee).format("0,0.00")} USDT
                        <div className="h-1px absolute w-70px top-9px bg-black"></div>
                        <div className="h-1px absolute -top-14px text-red-500 font-medium">
                            {Math.ceil((right?.openCardFee / right?.beforeDiscountOpenCardFee) * 100)}%OFF
                        </div>
                    </div>
                </div>
            );
        }
        return <div className="text-black text-sm font-medium mb-1">{numeral(right?.openCardFee).format("0,0.00")}</div>;
    };

    useEffect(() => {
        fetchRights();
    }, []);

    return (
        <main className="w-full h-screen bg-white md:bg-[#F5F6F7] overflow-y-auto">
            <header className="w-full px-4 bg-white flex justify-between items-center h-56px">
                <BackButton />
                <h3 className="m-0 font-medium">
                    {t("apply")} {getLanguage() === "en" ? right?.enName : right?.cnName}
                </h3>
                <div className="w-5 h-5 relative"></div>
            </header>

            <div className="w-full md:max-w-980px md:mt-5 mx-auto bg-white md:pt-5 pb-5">
                <section className="mx-auto max-w-430px">
                    <div className="px-4">
                        <Card info={{}} coverStyle={right?.coverStyle} coverUrl={right?.coverUrl} />
                    </div>
                </section>

                <section className="mt-4 w-full px-4">
                    <div className="">
                        <Link to={`/Equity/${rightsId}`} className="w-full flex items-center justify-between text-[#333]">
                            <div className="flex items-center font-medium">
                                <div className="w-2px h-14px bg-[#FFAC13] mr-1" />
                                <span>{t("cardBenefits")}</span>
                            </div>
                            <span className="block w-4 h-4 i-bees-left?mask text-[#999] transform rotate-180"></span>
                        </Link>

                        <div className="w-full mt-2 flex justify-between">
                            <div className="text-left">
                                {openFeeView()}
                                <div className="text-[#666] text-xs">{t("cardOpeningFee")}</div>
                            </div>

                            <div className="text-right">
                                {monthFeeView()}
                                <div className="text-[#666] text-xs">{t("annualFee")}</div>
                            </div>
                        </div>

                        <div className="w-full mt-3 flex justify-between">
                            <div className="text-left">
                                <div className="text-black text-sm font-medium ">{right?.rechargeFee}</div>
                                <div className="text-[#666] text-xs">{t("rechargeFee")}</div>
                            </div>
                            <div className="text-right">
                                {right?.consumptionFee == 0 ? (
                                    <div className="text-red-500 text-sm font-medium mb-1">{t("free")}</div>
                                ) : (
                                    <div className="text-black text-sm font-medium mb-1">{numeral(right?.consumptionFee).format("0,0.00")} USD</div>
                                )}
                                <div className="text-[#666] text-xs">{t("consumptionHandlingFee")}</div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3">
                        <div className="flex items-center font-medium">
                            <div className="w-2px h-14px bg-[#FFAC13] mr-1" />
                            <span>{t("applicationProcess")}</span>
                        </div>
                        <div className="flex mt-2">
                            <div className="flex-col flex items-center mr-3">
                                <div className="w-[18px] h-[18px] rounded-full border border-[#FFAC13] text-[#FFAC13] text-[10px] font-bold flex justify-center items-center">
                                    1
                                </div>
                                <div className="h-20px w-1px bg-[#FFAC13]"></div>
                                <div className="w-[18px] h-[18px] rounded-full border border-[#FFAC13] text-[#FFAC13] text-[10px] font-bold flex justify-center items-center">
                                    2
                                </div>
                                <div className="h-20px w-1px bg-[#FFAC13]"></div>
                                <div className="w-[18px] h-[18px] rounded-full border border-[#FFAC13] text-[#FFAC13] text-[10px] font-bold flex justify-center items-center">
                                    3
                                </div>
                            </div>
                            <div className="">
                                <div className="mb-2">
                                    <div className="text-zinc-800 text-xs font-medium">{t("apply")}</div>
                                    <div className="text-stone-500 text-xs">{t("fillInSimplifiedInformation")}</div>
                                </div>
                                <div className="mb-5">
                                    <div className="text-zinc-800 text-xs font-medium">{t("depositCrypto")}</div>
                                </div>
                                <div className="text-zinc-800 text-xs font-medium">{t("cardOpeningCompleted")}</div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3">
                        <div className="flex items-center font-medium text-sm">
                            <div className="w-2px h-14px bg-[#FFAC13] mr-1" />
                            <span>{t("supportConsumptionScenarios")}</span>
                        </div>
                        <div className="mt-2 text-xs text-[#666]" dangerouslySetInnerHTML={{ __html: right?.consumeScene }}></div>
                    </div>
                    {right?.enName?.includes(CardType.Diamond) && (
                        <div className="mt-3">
                            <div className="flex items-center font-medium text-sm">
                                <div className="w-2px h-14px bg-[#FFAC13] mr-1" />
                                <span>{t("feature")}</span>
                            </div>
                            <h3 className="mt-2 text-black font-bold">{getPropagation(right?.enName)}</h3>
                            <div className="mt-2 text-[#FFAC13] leading-5 text-sm">
                                <p>1. {t("physicalCardAvailable")}</p>
                                <p>2. {t("freeCardReplacementAfterExpiry")}</p>
                                <p>3. {t("referralRebate")}</p>
                            </div>
                        </div>
                    )}
                    {right?.enName?.includes(CardType.BlackGold) && (
                        <div className="mt-3">
                            <div className="flex items-center font-medium text-sm">
                                <div className="w-2px h-14px bg-[#FFAC13] mr-1" />
                                <span>{t("feature")}</span>
                            </div>
                            <h3 className="mt-2 text-black font-bold">{getPropagation(right?.enName)}</h3>
                            <div className="mt-2 text-[#FFAC13] leading-5 text-sm">
                                <p>1. {t("buyOneGetOneFree")}</p>
                                <p>2. {t("freePhysicalCard")}</p>
                                <p>3. {t("freeCardReplacementAfterExpiry")}</p>
                                <p>4. {t("referralRebate")}</p>
                                <p>5. {t("moreBenefitsAwait")}</p>
                            </div>
                        </div>
                    )}
                    {right?.enName?.includes(CardType.Standard) && (
                        <div className="mt-3">
                            <div className="flex items-center font-medium text-sm">
                                <div className="w-2px h-14px bg-[#FFAC13] mr-1" />
                                <span>{t("feature")}</span>
                            </div>
                            <h3 className="mt-2 text-black font-bold">{getPropagation(right?.enName)}</h3>
                        </div>
                    )}
                    {right?.enFeatureTitle && right?.cnFeatureTitle && (
                        <div className="mt-3">
                            <div className="flex items-center font-medium text-sm">
                                <div className="w-2px h-14px bg-[#FFAC13] mr-1" />
                                <span>{t("feature")}</span>
                            </div>
                            <h3 className="mt-2 text-black font-bold">{getLanguage() == "en" ? right?.enFeatureTitle : right?.cnFeatureTitle}</h3>
                        </div>
                    )}
                </section>

                <div className="w-full px-4 mt-4">
                    <Button loading={loading} onClick={go}>
                        {t("apply")}
                    </Button>
                </div>
            </div>
        </main>
    );
};

export default Reapply;
