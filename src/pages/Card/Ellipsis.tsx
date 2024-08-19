import { Collapse } from "antd-mobile";
import { useEffect } from "react";

type Props = {
  id: string;
};

const collapse = JSON.parse(localStorage.getItem("bees-collapse") ?? "[]");

export const EllipsisUl = ({ id }: Props) => {
  useEffect(() => {
    if (!collapse.includes(id)) {
      collapse.push(id);
      localStorage.setItem("bees-collapse", JSON.stringify(collapse));
    }
  }, [id]);

  return (
    <Collapse
      key={id}
      defaultActiveKey={collapse.includes(id) ? [] : [id]}
      className="bees-collapse"
      arrowIcon={
        <div className="w-4 h-4 i-bi:chevron-double-down?mask text-[#FFC04D]" />
      }
    >
      <Collapse.Panel
        className="!pl-4"
        key={id}
        title={<div className="text-sm font-medium">{t("precautions")}</div>}
      >
        <div className="leading-5 text-xs px-1">
          <p className="flex items-start">
            <span className="mr-2">1.</span>
            <span>
              <b>{t("overspendingProhibited")}</b> {t("overspending...issuer")}
            </span>
          </p>
          <p className="flex items-start">
            <span className="mr-2">2.</span>
            <span>
              <b>{t("chargebackFraudProhibited")}</b> {t("chargeback...card")}
            </span>
          </p>
          <p className="flex items-start">
            <span className="mr-2">3.</span>
            <span>
              {t("doNotUse...policies")}
              <b>{t("theList...policies")}</b>
            </span>
          </p>
        </div>
      </Collapse.Panel>
    </Collapse>
  );
};
