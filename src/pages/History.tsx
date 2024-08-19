import { useEffect, useRef, useState } from "react";
import BackButton from "../components/BackButton";
import { getCryptoTransactions, getTransactions } from "../request/home";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

declare let t: Function;

export default () => {
  const listRef = useRef([[], []]);
  const [tabIndex, setTabIndex] = useState(0);
  const [updateKey, setUpdateKey] = useState(1);
  const { id } = useParams();

  const onChange = (index: number) => {
    setTabIndex(index);
    fetchTransactions(index);
  };

  const fetchTransactions = async (i: number) => {
    if (!id) return;
    if (i === 0) {
      const result = await getTransactions({ page: 1, limit: 100, id });
      if (result?.data) {
        listRef.current[0] = result?.data?.items;
      }
    } else if (i === 1) {
      const result = await getCryptoTransactions({ page: 1, limit: 100, id });
      if (result?.data) {
        listRef.current[1] = result?.data?.items;
      }
    }
    setUpdateKey(updateKey + 1);
  };

  const scrollHandler = () => {
    if (scrollY + innerHeight >= document.body.scrollHeight) {
      console.log("go");
    }
  };

  useEffect(() => {
    fetchTransactions(tabIndex);
    addEventListener("scroll", scrollHandler);
    return () => {
      removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const tabClass = (selected: boolean) =>
    selected ? "border-[#333] text-[#333]" : "border-none text-[#666]";
  return (
    <main className="w-full h-screen bg-white md:bg-[#F5F6F7] overflow-y-auto">
      <header className="w-full px-4 bg-white flex justify-between items-center h-56px">
        <BackButton />
        <h3 className="m-0 font-medium text-lg">{t("record")}</h3>
        <div className="w-5 h-5 relative"></div>
      </header>

      <div className="w-full md:max-w-980px md:mt-5 mx-auto bg-white md:pt-5 pb-5">
        <div className="px-4 mt-2">
          <button
            onClick={() => onChange(0)}
            className={`${tabClass(
              tabIndex === 0
            )} border-b-2px pb-2px font-medium mr-8`}
          >
            <span>{t("transactionHistory")}</span>
          </button>
          <button
            onClick={() => onChange(1)}
            className={`${tabClass(
              tabIndex === 1
            )} border-b-2px pb-2px font-medium`}
          >
            <span>{t("topUpHistory")}</span>
          </button>
        </div>

        <section className="mt-4 px-4" key={updateKey}>
          <ListView list={listRef.current[tabIndex]} />
        </section>
      </div>
    </main>
  );
};

enum State {
  Pending = "Pending",
  Closed = "Closed",
  Fail = "Fail",
  Complete = "Complete",
}

const ListView = ({ list }: { list: any[] }) => {
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
    return <OrderItem item={item} key={i} className="mb-4 p-3" />;
  });
};

type ItemProps = {
  item: any;
  className?: string;
  key: string | number;
};

export const OrderItem = ({ item, className, key }: ItemProps) => {
  const statusView = (state: State) => {
    switch (state) {
      case State.Pending:
        return <span className="text-[#FF8A00]">Pending</span>;
      case State.Complete:
        return <span className="text-[#00D47B]">Completed</span>;
      case State.Fail:
        return <span className="text-[#E44430]">failed</span>;
    }
    return "";
  };

  const feeView = (fee: number) => {
    if (Number(fee))
      return (
        <span className="text-[#666] text-[12px]">
          ({t("fee")} <span className="text-[#00D47B]">{item?.fee}</span>)
        </span>
      );
  };
  return (
    <div key={key} className={`bg-white rounded-8px ${className}`}>
      <div className="flex items-center justify-between">
        <div className="">
          <div className="text-black text-sm font-bold flex items-center">
            {item?.amount > 0 ? "+" : "-"}${Math.abs(item?.amount)}
            {feeView(item?.fee)}
          </div>
          <div className="text-[#666] text-[11px]">
            {dayjs(item?.transactionTime || Number(item?.createTime)).format(
              "YYYY-MM-DD HH:mm:ss"
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="text-[#666] text-sm font-medium">{item?.type}</div>
          <div className="text-xs text-[11px]">{statusView(item?.status)}</div>
        </div>
      </div>
      {item?.detail && (
        <div className="text-xs">
          <span className="text-[#666]">{t("detail")}: </span>
          <span className="text-[#333]">{item?.detail}</span>
        </div>
      )}
    </div>
  );
};
