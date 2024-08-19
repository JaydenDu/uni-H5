import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import { getRights } from "../request/home";
import { useParams } from "react-router-dom";
import { cache } from "../helpers/cache";

declare let t: Function;

export default () => {
  const [rights, setRights] = useState<any>();
  const { id } = useParams();
  const rightsId = Number(id);

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

  useEffect(() => {
    fetchRights();
  }, []);

  return (
    <main className="w-full h-screen bg-white md:bg-[#F5F6F7] overflow-y-auto text-sm">
      <header className="w-full px-4 bg-white flex justify-between items-center h-56px">
        <BackButton />
        <h3 className="m-0 font-medium text-lg">{t("cardBenefits")}</h3>
        <div className="w-5 h-5 relative"></div>
      </header>
      <div className="w-full md:max-w-980px md:mt-5 mx-auto bg-white md:pt-5 pb-5 px-4">
        <div className="w-full flex">
          {rights?.coverUrl ? (
            <img className="w-25" alt="" src={rights?.coverUrl} />
          ) : (
            <div className="w-25 h-14 bg-[#eee]"></div>
          )}
          <div className="ml-3">
            <div className="font-medium mb-1">{t("debitCard")}</div>
            <div className="flex text-[#333]">
              <div className="py-1 px-2 rounded flex text-sm bg-[#F5F6F7] mr-2">
                USD
              </div>
              <div className="py-1 px-2 rounded flex text-sm bg-[#F5F6F7] mr-2">
                Visa
              </div>
              <div className="py-1 px-2 rounded flex text-sm bg-[#F5F6F7]">
                {t("virtualCard")}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className=" ">
            <div className="flex justify-between mb-3">
              <div className="text-[#666] text-sm]">{t("cardOpeningFee")}</div>
              <div className="text-[#333] text-sm font-medium">
                {rights?.openCardFee} USDT
              </div>
            </div>
            <div className="flex justify-between mb-3">
              <div className="text-[#666] text-sm]">{t("monthlyFee")}</div>
              <div className="text-[#333] text-sm font-medium">
                {rights?.monthFee} USD
              </div>
            </div>
            <div className="flex justify-between mb-3">
              <div className="text-[#666] text-sm]">{t("rechargeFee")}</div>
              <div className="text-[#333] text-sm font-medium">
                {rights?.rechargeFee}
              </div>
            </div>
            <div className="flex justify-between mb-3">
              <div className="text-[#666] text-sm]">
                {t("consumptionHandlingFee")}
              </div>
              <div className="text-[#333] text-sm font-medium">
                {rights?.consumptionFee} USD
              </div>
            </div>
            <div className="w-full border border-[#F5F6F7] mb-4"></div>
          </div>
          <div className=" ">
            <div className="flex justify-between mb-3">
              <div className="text-[#666] text-sm]">
                {t("minimumSingleRechargeAmount")}
              </div>
              <div className="text-[#333] text-sm font-medium">
                {rights?.nonFirstRechargeMinLimit} USDT
              </div>
            </div>
            <div className="flex justify-between mb-3">
              <div className="text-[#666] text-sm]">
                {t("maximumFundsOnTheCard")}
              </div>
              <div className="text-[#333] text-sm font-medium">
                {rights?.maxAssetLimit.replace("USD/Day", "")} USD/Day
              </div>
            </div>
            <div className="flex justify-between mb-3">
              <div className="text-[#666] text-sm]">
                {t("estimatedDeliveryTime")}
              </div>
              <div className="text-[#333] text-sm font-medium">
                {rights?.estimatedDeliveryTime.replace("Min", "")} Min
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div className="flex items-center">
              <div className="w-0.5 h-3.5 bg-amber-500 mr-1" />
              <div className="text-[#333] text-base font-medium">
                {t("instructionsForUse")}
              </div>
            </div>
            <div className="text-[#333] text-sm font-medium mt-4 mb-2">
              {t("supportConsumptionScenarios")}
            </div>
            <div
              className="text-sm text-[#666]"
              dangerouslySetInnerHTML={{ __html: rights?.consumeScene }}
            />
          </div>
        </div>
      </div>
    </main>
  );
};
