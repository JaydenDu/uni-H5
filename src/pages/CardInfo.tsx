import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import { getCardState } from "../request/home";
import Copy from "../components/Copy";
import { cache } from "../helpers/cache";
import { useParams } from "react-router-dom";

export default () => {
  const [cardInfo, setCardInfo] = useState<any>();
  const [show, setShow] = useState(false);
  const { id } = useParams();

  const fetchCardState = async () => {
    if (id)
      cache(
        `getCardState-${id}`,
        () => getCardState(id),
        (result: any) => {
          if (result?.data) {
            setCardInfo(result?.data);
          }
        }
      );
  };

  const createDate = new Date(cardInfo?.createDate).getTime();
  const expireDate = new Date("2024-05-22").getTime();

  useEffect(() => {
    fetchCardState();
  }, []);

  return (
    <main className="w-full h-screen bg-[#F5F6F7] text-sm">
      <header className="w-full px-4 bg-white flex justify-between items-center h-56px">
        <BackButton />
        <h3 className="m-0 font-medium text-lg">{t("information")}</h3>
        <div className="w-5 h-5 relative"></div>
      </header>
      <section className="w-full my-5 md:w-980px bg-white m-auto p-5">
        <div className="flex justify-between mb-3">
          <div className="text-[#666] text-sm">{t("issuer")}</div>
          <Item content={cardInfo?.issuer} />
        </div>
        <div className="flex justify-between mb-3">
          <div className="text-[#666] text-sm">{t("firstName")}</div>
          <Item
            content={
              createDate < expireDate ? cardInfo?.lastName : cardInfo?.firstName
            }
          />
        </div>
        <div className="flex justify-between mb-3">
          <div className="text-[#666] text-sm">{t("lastName")}</div>
          <Item
            content={
              createDate < expireDate ? cardInfo?.firstName : cardInfo?.lastName
            }
          />
        </div>
        <div className="flex justify-between mb-3">
          <div className="text-[#666] text-sm">{t("cardNumber")}</div>
          <Item content={cardInfo?.cardNo} />
        </div>
        <div className="flex justify-between mb-3">
          <div className="text-[#666] text-sm">{t("expirationDate")}</div>
          <Item
            content={`${cardInfo?.expireMonth ?? ""}/${
              cardInfo?.expireYear ?? ""
            }`}
          />
        </div>
        <div className="flex items-center justify-between mb-3">
          <div className="text-[#666] text-sm">CVV</div>
          <div className="flex items-center">
            <span className="text-[#333] text-sm font-medium">
              CVV:{show ? cardInfo?.cvv : "***"}{" "}
            </span>
            <button className="p-2" onClick={() => setShow(!show)}>
              {show ? (
                <div className="w-4 h-4 i-bees-show?mask text-[#333]" />
              ) : (
                <div className="w-4 h-4 i-bees-hidden?mask text-[#333]" />
              )}
            </button>
            <Copy content={cardInfo?.cvv} />
          </div>
        </div>
        <div className="flex justify-between mb-3">
          <div className="text-[#666] text-sm">{t("phoneNumber")}</div>
          <Item
            content={`${cardInfo?.countryCode ?? ""} ${
              cardInfo?.phoneNumber ?? ""
            }`}
          />
        </div>
      </section>
    </main>
  );
};

const Item = ({ content }: any) => {
  return (
    <div className="flex items-center">
      <div className="text-[#333] text-sm font-medium mr-2">{content}</div>
      <Copy content={content} />
    </div>
  );
};
