import { useEffect, useState } from "react";
import numeral from "numeral";
import { getCardInfo, getCardState, getRights, triggerCheck } from "../../request/home";
import QrCode from "../../components/QrCode";
import { message } from "../../components/Message";
import SelectedTokenModal, { TokenType } from "./SelectedTokenModal";
import Copy from "../../components/Copy";
import { CardState } from "./const";
import { cache } from "../../helpers/cache";
import { useParams } from "react-router-dom";

declare let t: Function;

type Props = {
    className?: string;
    ok: Function;
    cardId: string;
};

export const getChainFee = (chain: string | undefined, obj: any) => {
    if (chain === TokenType.Polygon) return obj?.polygonFee;
    if (chain === TokenType.Tron) return obj?.tronFee;
    if (chain === TokenType.Ethereum) return obj?.ethereumFee;
    return 0;
};

export const getChainAddress = (chain: string | undefined, obj: any) => {
    if (chain === TokenType.Polygon) return obj?.ercAddress;
    if (chain === TokenType.Tron) return obj?.trcAddress;
    if (chain === TokenType.Ethereum) return obj?.ercAddress;
    return "";
};

export const getChainName = (chain: string | undefined) => {
    if (chain === TokenType.Polygon) return "Tether USD (Polygon)";
    if (chain === TokenType.Tron) return "Tether USD (Trc20)";
    if (chain === TokenType.Ethereum) return "Tether USD (Ethereum)";
    return t("chooseTokenNetwork");
};

let timer = 0;

export default ({ className, ok, cardId }: Props) => {
    const minInput = 10;
    const [cardInfo, setCardInfo] = useState<any>();
    const [rights, setRights] = useState<{ [k: string]: string }>();
    const [visible, setVisible] = useState(true);
    const [selected, setSelected] = useState<TokenType | undefined>();
    const { id } = useParams();
    const rightsId = Number(id);

    const select = (item: TokenType) => {
        setSelected(item);
        setVisible(false);
    };

    const loopCheckCardInfo = () => {
        const loop = async () => {
            const result = await getCardInfo(cardId);
            if (result?.data?.cardState === CardState.succeed) {
                ok();
            } else {
                timer = setTimeout(() => loop(), 2000 * 60);
            }
        };
        loop();
    };
    const fetchCardState = async () => {
        const result = await getCardState(cardId);
        if (result?.data) {
            setCardInfo(result?.data);
        }
    };

    const fetchRights = async () => {
        cache(
            `getRights-${rightsId}`,
            () => getRights(rightsId),
            (result: any) => {
                if (result?.data) {
                    setRights(result?.data);
                }
            }
        );
    };

    const refresh = async () => {
        const result = await triggerCheck();
        if (result?.code === 200) {
            message.success(t("waitingForYourFund"));
        }
    };

    useEffect(() => {
        fetchCardState();
        loopCheckCardInfo();
        fetchRights();
        return () => {
            clearTimeout(timer);
        };
    }, []);

    const isInactive = cardInfo?.cardState === CardState.inactive;
    const address = getChainAddress(selected, cardInfo);
    const topUpFee = getChainFee(selected, rights);

    const openCardFee = Number(rights?.openCardFee) || 0;
    const totalFee = openCardFee + minInput;

    const additionalAmountRequired = Number(cardInfo?.additionalAmountRequired) || 0;
    const requiredFee = isInactive ? minInput + additionalAmountRequired : totalFee;

    const chain = selected;
    return (
        <div className={`w-full text-[#666] text-sm ${className}`}>
            <section className="flex justify-center text-center text-sm px-4">
                <div className="flex flex-col justify-center items-center">
                    <div className="mb-14px">{t("minimumTopUpAmount")}</div>
                    <div className="mb-14px">
                        <img className="w-10" alt="" src="./usdt1.png" />
                    </div>
                    <b className="text-30px text-black">{numeral(requiredFee).format("0,0.00")} USDT</b>
                </div>
            </section>

            <div className="w-full h-2 bg-[#F5F6F7] my-5"></div>

            <section className="text-sm px-4">
                <div className="flex justify-between mb-5">
                    <span>{t("cardOpeningFee")}</span>
                    <span>{openCardFee}</span>
                </div>
            </section>

            <div className="mt-3 px-4">
                <div className="flex justify-between mb-4">
                    <div className="">{t("chooseTokenNetwork")}</div>
                    <div>
                        <button onClick={() => setVisible(true)} className="h-5 flex items-center">
                            <span className={selected ? "text-[#333]" : "text-[#666]"}>{getChainName(selected)}</span>
                            <span className="inline-block w-18px h-18px i-bees-down"></span>
                        </button>
                        {selected && (
                            <div className="text-right">
                                <span className="text-xs text-[#FFAC13] mt-1">
                                    {t("topUpFee")}: {topUpFee} USDT
                                </span>
                            </div>
                        )}
                        <SelectedTokenModal
                            rights={rights}
                            onClose={() => setVisible(false)}
                            onSelected={select}
                            visible={visible}
                            selected={selected ?? TokenType.Tron}
                        />
                    </div>
                </div>

                {address && (
                    <>
                        <div className="flex justify-between mb-4">
                            <div className="flex-shrink-0">{t("depositAddress")}</div>
                            <div className="flex items-start flex-shrink-1 ml-5">
                                <div className="text-[#333] break-all text-right mr-2">{address}</div>
                                <Copy content={address} />
                            </div>
                        </div>
                        <div className="flex justify-end mb-4">
                            <QrCode content={address} className="w-64px h-64px" />
                        </div>
                        <div className="flex flex-col justify-center items-center mb-7">
                            <div className="text-center text-amber-300 text-sm mb-3">{t("waitingForYourFund")}...</div>
                            <div>
                                <img src="./loading.png" alt="" className="w-50px h-50px animate-spin" />
                            </div>
                        </div>

                        <div className="mb-4">
                            <button onClick={refresh} className="h-12 w-full border border-[#FFAC13] rounded-lg text-[#FFAC13] text-base font-medium">
                                {t("refresh")}
                            </button>
                        </div>

                        <div className="text-[#999] text-[10px] mb-4"></div>

                        <div className="p-3 mt-1 text-xs bg-[#FFF7EA] rounded-lg border border-[#FBD978]">
                            <div className="text-[#E19100] font-semibold">{t("importantNotice")}:</div>
                            <div className="mt-2 text-[#E19100]">
                                <p>- {t("thisAddressOnly...chain", { chain })}</p>
                                <p>- {t("anAdditionalFund...deposits", { chain, usdt: topUpFee })}</p>
                                <p>- {t("pleaseDoNot...thisAddress", { chain })}</p>
                            </div>
                            <div className="mt-2 text-[#E19100]">
                                <p>- {t("theMinimumTop-up...credited")}</p>
                                <p>- {t("cross-chain...supported")}</p>
                                <p>- {t("lossesDue...recovered")}</p>
                                <p>- {t("theHandlingFee...benefitsPage")}</p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
