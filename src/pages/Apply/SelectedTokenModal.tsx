import Modal from "../../components/Modal";

type Props = {
    onSelected: Function;
    visible: boolean;
    onClose: Function;
    rights: any;
    selected: TokenType;
};

export enum TokenType {
    Polygon = "Polygon",
    Tron = "Tron",
    Ethereum = "Ethereum",
}

const getChainFee = (chain: string | undefined, obj: any) => {
    if (chain === TokenType.Polygon) return obj?.polygonFee;
    if (chain === TokenType.Tron) return obj?.tronFee;
    if (chain === TokenType.Ethereum) return obj?.ethereumFee;
    return 0;
};

export default ({ onSelected, visible, onClose, rights, selected }: Props) => {
    const select = (item: TokenType) => {
        onSelected(item);
    };

    return (
        <Modal visible={visible}>
            <div className="w-screen max-w-400px px-4">
                <div className="bg-white rounded-lg m-auto flex flex-col">
                    <div className="h-[43px] border-b border-solid border-[#F2F2F2] flex justify-between mt-6 px-6">
                        <div className="text-black text-[18px] tracking-[0] leading-[26px]">{t("chooseTokenNetwork")}</div>
                        <button onClick={onClose} className="w-4 h-4 i-bees-close" />
                    </div>

                    <div className="p-4">
                        <p className="mb-4">{t("pleaseNote...youChoose")}</p>
                        <button onClick={() => select(TokenType.Tron)} className="w-full flex items-center justify-between mb-4 border-b border-[#ededed] pb-2">
                            <div className="flex items-center ">
                                <img src="./usdt1.png" alt="" className="w-6 mr-2" />
                                <div className="text-left">
                                    <div className="text-[#333] text-sm font-medium">Trc20</div>
                                    <div className="text-[#999] text-xs">
                                        Tether USD (USDT){" "}
                                        <span className="text-xs text-[#FFAC13] mt-1">
                                            {t("topUpFee")}: {getChainFee(TokenType.Tron, rights)} USDT
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {selected === TokenType.Tron && <div className="h-5 w-5 i-bees-selected?mask text-green-500"></div>}
                        </button>
                        <button
                            onClick={() => select(TokenType.Polygon)}
                            className="w-full flex items-center justify-between mb-4 border-b border-[#ededed] pb-2"
                        >
                            <div className="flex items-center ">
                                <img src="./usdt1.png" alt="" className="w-6 mr-2" />
                                <div className="text-left">
                                    <div className="text-[#333] text-sm font-medium">Polygon</div>
                                    <div className="text-[#999] text-xs">
                                        Tether USD (USDT){" "}
                                        <span className="text-xs text-[#FFAC13] mt-1">
                                            {t("topUpFee")}: {getChainFee(TokenType.Polygon, rights)} USDT
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {selected === TokenType.Polygon && <div className="h-5 w-5 i-bees-selected?mask text-green-500"></div>}
                        </button>
                        <button
                            onClick={() => select(TokenType.Ethereum)}
                            className="w-full flex items-center justify-between mb-4 border-b border-[#ededed] pb-2"
                        >
                            <div className="flex items-center ">
                                <img src="./usdt1.png" alt="" className="w-6 mr-2" />
                                <div className="text-left">
                                    <div className="text-[#333] text-sm font-medium">Ethereum</div>
                                    <div className="text-[#999] text-xs">
                                        Tether USD (USDT){" "}
                                        <span className="text-xs text-[#FFAC13] mt-1">
                                            {t("topUpFee")}: {getChainFee(TokenType.Ethereum, rights)} USDT
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {selected === TokenType.Ethereum && <div className="h-5 w-5 i-bees-selected?mask text-green-500"></div>}
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
