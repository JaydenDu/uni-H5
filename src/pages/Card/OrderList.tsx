import { useEffect, useRef, useState } from "react";
import { getCryptoTransactions, getTransactions } from "../../request/home";
import { OrderItem } from "../History";
import { Link } from "react-router-dom";

declare let t: Function;

type Props = {
    id: string;
};

export default ({ id }: Props) => {
    const listRef = useRef([[], []]);
    const [tabIndex, setTabIndex] = useState(0);
    const [updateKey, setUpdateKey] = useState(1);

    const onChange = (index: number) => {
        setTabIndex(index);
        fetchTransactions(index);
    };

    const fetchTransactions = async (i: number) => {
        if (!id) return;
        if (i === 0) {
            const result = await getTransactions({ id });
            if (result?.data) {
                listRef.current[0] = result?.data?.items;
            }
        } else if (i === 1) {
            const result = await getCryptoTransactions({ id });
            if (result?.data) {
                listRef.current[1] = result?.data?.items;
            }
        }
        setUpdateKey(updateKey + 1);
    };

    useEffect(() => {
        fetchTransactions(tabIndex);
    }, [id]);

    const tabClass = (selected: boolean) => (selected ? "border-[#333] text-[#333]" : "border-white text-[#666]");
    return (
        <section className="px-4">
            <div className="flex items-center justify-between">
                <div>
                    <button onClick={() => onChange(0)} className={`${tabClass(tabIndex === 0)} border-b-2px pb-2px font-medium mr-8`}>
                        <span>{t("transactionHistory")}</span>
                    </button>
                    <button onClick={() => onChange(1)} className={`${tabClass(tabIndex === 1)} border-b-2px pb-2px font-medium`}>
                        <span>{t("topUpHistory")}</span>
                    </button>
                </div>
                <Link to={`/History/${id}`}>
                    <div className="flex items-center">
                        <span className="text-sm text-[#666] mr-1">{t("more")}</span>
                        <span className="block w-4 h-4 i-bees-left?mask text-[#666] transform rotate-180"></span>
                    </div>
                </Link>
            </div>

            <div className="mt-4" key={updateKey}>
                <List list={listRef.current[tabIndex]} />
            </div>
        </section>
    );
};

export const EmptyOrderList = () => {
    return (
        <section className="px-4">
            <div className="flex items-center justify-between">
                <div className="opacity-50">
                    <button className={`border-[#333] text-[#333] border-b-2px pb-2px font-medium mr-8`}>
                        <span>{t("transactionHistory")}</span>
                    </button>
                    <button className={`border-white text-[#666] border-b-2px pb-2px font-medium`}>
                        <span>{t("topUpHistory")}</span>
                    </button>
                </div>
                <div className="opacity-50">
                    <div className="flex items-center">
                        <span className="text-sm text-[#666] mr-1">{t("more")}</span>
                        <span className="block w-4 h-4 i-bees-left?mask text-[#666] transform rotate-180"></span>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <List list={[]} />
            </div>
        </section>
    );
};

const List = ({ list }: { list: any[] }) => {
    if (list?.length === 0) {
        return (
            <section className="flex justify-center text-center mt-50px px-4">
                <div className="">
                    <div className="w-150px h-85px i-bees-empty"></div>
                    <div className="text-[#999] mt-3">{t("noRecord")}</div>
                </div>
            </section>
        );
    }
    return list?.map?.((item, i) => {
        return <OrderItem item={item} key={i} className="mb-30px" />;
    });
};
