import { useState } from "react";
import Modal from "../../components/Modal";
import { transfer } from "../../request/home";
import { message } from "../../components/Message";
import Button from "../../components/Button";
import numeral from "numeral";
import { Input } from "antd-mobile";

declare let t: Function;

type Props = {
    id: string;
    cards: any[];
    onOk: Function;
};

const groupCards = (id: string, cards: any[]) => {
    return cards.reduce(
        (a, c) => {
            if (c?.cardNo === id) {
                a[0] = c;
            } else if (c?.cardNo) {
                a[1].push(c);
            }
            return a;
        },
        [null, []]
    );
};

export default ({ id, cards, onOk }: Props) => {
    const [fromCard, eCards] = groupCards(id, cards);

    const [visible, setVisible] = useState(false);
    const [transferAmount, setTransferAmount] = useState<any>();
    const [selectedCard, setSelectedCard] = useState(eCards[0]?.rightsId);
    const [loading, setLoading] = useState(false);

    const open = () => {
        setSelectedCard(eCards[0]?.rightsId);
        setVisible(true);
    };

    const close = () => {
        setVisible(false);
    };

    const onAmountChange = (v: any) => {
        setTransferAmount(v);
    };

    const onAmountBlur = () => {
        const v = Math.floor(numeral(transferAmount).multiply(100).value() ?? 0) / 100;
        const b = Number(fromCard?.availableBalance);
        const value = Math.min(Math.max(0, v), b);
        setTransferAmount(value);
    };

    const confirm = async () => {
        onAmountBlur();
        const fromRightsId = fromCard?.rightsId;
        const toRightsId = selectedCard;
        const amount = Number(transferAmount);

        if (!amount) {
            message.error(t("pleaseInputAmount"));
            return;
        }

        setLoading(true);
        try {
            const result = await transfer({ fromRightsId, toRightsId, amount });
            if (result?.code === 200) {
                message.success(t("succeed"));
                close();
                onOk();
            } else {
                message.error(result?.message);
            }
        } catch (error) {
            message.error(error);
        } finally {
            setLoading(false);
        }
    };

    const selectCard = (card: any) => {
        setSelectedCard(card);
    };

    return (
        <>
            <button onClick={open} className="h-22px text-xs px-2 bg-[#FFC04D] flex items-center rounded-md text-white">
                {t("transfer")}
            </button>
            <Modal visible={visible} onMaskClick={close}>
                <div className="w-screen max-w-400px px-4">
                    <div className="bg-white w-full rounded-[16px] flex flex-col text-sm">
                        <div className="h-[43px] border-b border-solid border-[#F2F2F2] flex justify-between mt-6 mb-4 px-6">
                            <div className="text-black text-[18px] tracking-[0] leading-[26px]">{t("transfer")}</div>
                            <button onClick={close} className="w-4 h-4 i-bees-close" />
                        </div>

                        <div className="p-4">
                            <div className="flex items-center">
                                <div className="text-black mr-4 w-20">{t("from")}:</div>
                                <div className="font-semibold">
                                    <CardNo id={id} />
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="text-black mr-4 w-20"></div>
                                <div className="text-[#666] text-xs">
                                    ({t("balance")}: {fromCard?.availableBalance ?? 0} USD)
                                </div>
                            </div>
                            <div className="mt-5 flex items-baseline">
                                <div className="text-black mr-4 w-20">{t("to")}:</div>
                                <div>
                                    {eCards.map((card: any) => (
                                        <button
                                            key={card?.cardNo}
                                            className={`mb-3 flex items-center rounded-md px-2 box-border ${
                                                selectedCard === card?.rightsId ? "bg-[#ffc04d33] border border-[#FFC04D] text-[#FFC04D]" : "text-[#787878]"
                                            }`}
                                            onClick={() => selectCard(card?.rightsId)}
                                        >
                                            <CardNo id={card?.cardNo} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-2 flex items-center">
                                <div className="text-black mr-4 w-20 flex-shrink-0">{t("amount")}:</div>
                                <div className="border border-gray-300 px-2 py-1 rounded-md w-40">
                                    <Input
                                        type="number"
                                        value={transferAmount}
                                        onChange={onAmountChange}
                                        onBlur={onAmountBlur}
                                        min={0}
                                        max={fromCard?.availableBalance}
                                        style={{ "--font-size": "14px" }}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center mt-2">
                                <div className="text-black mr-4 w-20"></div>
                                <div className="text-[#666] text-xs">({t("transferFee")}: 0.1 USD)</div>
                            </div>
                        </div>
                        <div className="flex justify-end p-4 mb-2 mt-5">
                            <button onClick={close} className="h-9 flex-1 rounded-lg flex items-center justify-center border border-[#ccc] mr-5 text-[#999]">
                                {t("cancel")}
                            </button>
                            <Button
                                loading={loading}
                                onClick={confirm}
                                className="h-9 flex-1 rounded-lg flex items-center justify-center bg-[#FFC04D] text-white"
                            >
                                {t("confirm")}
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

const CardNo = ({ id }: any) => {
    return (
        <>
            <span className="mr-1">{id?.slice(0, 4)}</span>
            <span className="mr-1">{id?.slice(4, 8)}</span>
            <span className="mr-1">{id?.slice(8, 12)}</span>
            <span>{id?.slice(12, 16)}</span>
        </>
    );
};
