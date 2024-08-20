import { useEffect, useState } from "react";
import Form from "./Form";
import Payment from "./Payment";
import Results from "./Results";
import Tabs, { TabType } from "./Tabs";
import { useLocation, useParams } from "react-router-dom";
import { CardState } from "./const";

declare let t: Function;

const getTabType = (state: string) => {
  if (state === CardState.apply_passed || state === CardState.inactive) {
    return TabType.Payment;
  }
  return TabType.Form;
};

export default () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(getTabType(location.state?.card));
  const [cardId, setCardId] = useState(location.state?.id);

  const ok = (id: string) => {
    setCardId(id);
    setActiveTab(TabType.Payment);
  };

  const payment = () => {
    setActiveTab(TabType.Results);
  };

  const tabPage = () => {
    switch (activeTab) {
      case TabType.Form:
        return <Form ok={ok} />;
      case TabType.Payment:
        return <Payment ok={payment} cardId={cardId} />;
      case TabType.Results:
        return <Results />;
    }
  };

  return (
    <Page bread={t("applyForCard")}>
      <section className="w-full">
        <div className="w-full px-4 md:px-100px md:py-30px bg-white">
          <div className="hidden md:flex items-center font-medium pb-5">
            <div className="w-2px h-14px bg-[#FFAC13] mr-1" />
            <span>{t("applicationProcess")}</span>
          </div>
          <Tabs active={activeTab} />
        </div>

        <div className="md:mt-4 md:px-100px pb-30px pt-5 bg-white">
          {tabPage()}
        </div>
      </section>
    </Page>
  );
};
