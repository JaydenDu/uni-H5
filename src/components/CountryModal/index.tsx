import { useState } from "react";
import Country from "./country.json";
import Modal from "../Modal";

type Props = {
    visible: boolean;
    onClose: Function;
    onOk: Function;
};

export default ({ visible, onClose, onOk }: Props) => {
    const [data, setData] = useState(Country);

    const onSearch = (e: any) => {
        const v = e.target.value;
        const result = Country.filter(([label, prefix]) => label.toLocaleLowerCase().startsWith(v?.toLocaleLowerCase() || v) || prefix.startsWith("" + v));
        setData(result);
    };

    const select = (v: string) => {
        onClose();
        onOk(v);
    };
    return (
        <Modal visible={visible} onMaskClick={onClose} isBottom={false}>
            <div className="w-screen max-w-400px px-4">
                <div className="bg-white h-[80vh] rounded-t-[16px] flex flex-col">
                    <div className="h-[43px] border-b border-solid border-[#F2F2F2] flex justify-between mt-6 mb-4 px-6">
                        <div className="text-black text-[18px] tracking-[0] leading-[26px]">{t("region")}</div>
                        <button onClick={() => onClose()} className="w-4 h-4 i-bees-close" />
                    </div>

                    <div className="h-[40px] bg-[#F7F7F7] rounded-[8px] flex px-3 items-center mb-3 mx-6">
                        <div className="w-5 h-5 i-bees-search mr-2" />
                        <input
                            type="text"
                            className="flex-1 h-5 bg-[#F7F7F7] placeholder:text-[#C4C4C4] text-black text-[16px] tracking-[0] leading-[24px] border-none outline-none"
                            placeholder={t("search")}
                            onChange={onSearch}
                        />
                    </div>

                    <div className="flex-1 overflow-auto">
                        {data.map(([label, value]) => {
                            return (
                                <button
                                    key={value}
                                    onClick={() => select(value)}
                                    className="h-[46px] w-full flex justify-between items-center focus:bg-[#fff9ee] px-6"
                                >
                                    <div className="text-left text-black text-[16px] tracking-[0] leading-[24px]">{label}</div>
                                    <div className="text-[#999] text-[14px] text-right leading-[24px]">+{value}</div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Modal>
    );
};
