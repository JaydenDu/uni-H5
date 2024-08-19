import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Card from "./Card/Card";
import Button from "../components/Button";
import numeral from "numeral";
import { useCard } from "../providers/CardProviders";
import Logout from "./Card/Logout";
import { appleAuthUrl, getUserCards, googleAuthUrl } from "../request/home";
import { isAuth } from "../helpers/api";
import { getLanguage } from "../components/i18n";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

declare let t: Function;

export enum CardType {
  Diamond = "Diamond",
  BlackGold = "Black-Gold",
  Standard = "Standard",
}

export const getPropagation = (name: string) => {
  if (name?.includes(CardType.Diamond)) {
    return t("theBest...money");
  } else if (name?.includes(CardType.BlackGold)) {
    return t("most...vip");
  } else if (name?.includes(CardType.Standard)) {
    return t("the...cheapest");
  }
  return "";
};

let cacheIndex = 0;

export default () => {
  const navigate = useNavigate();
  const { allRights } = useCard();
  const usedRights = allRights
    ?.filter((v: any) => v?.effect)
    .sort((a: any, b: any) => {
      const aHasA = a.enName?.includes(CardType.Diamond);
      const bHasA = b.enName?.includes(CardType.Diamond);
      const aHasB = a.enName?.includes(CardType.BlackGold);
      const bHasB = b.enName?.includes(CardType.BlackGold);

      if (aHasA && !bHasA) return -1;
      if (!aHasA && bHasA) return 1;
      if (aHasB && !bHasB) return -1;
      if (!aHasB && bHasB) return 1;
      return 0;
    });
  const [index, setIndex] = useState(cacheIndex);

  const right = usedRights?.[index];

  const onSwiperChange = (i: number) => {
    setIndex(i);
    cacheIndex = i;
  };

  const go = async () => {
    navigate(`/Apply/${right?.rightsId}`);
  };

  const reload = async () => {
    if (isAuth()) {
      const result = await getUserCards();
      if (result?.data?.length > 0) {
        navigate("/Card", { replace: true });
      }
    }
  };

  const monthFeeView = () => {
    if (right?.monthFee == 0 && right?.beforeDiscountMonthFee > 0) {
      return (
        <div className="mb-1 h-5 flex items-center relative">
          <span className="text-black text-sm font-medium relative">
            {numeral(right?.beforeDiscountMonthFee).format("0,0.00")} USD * 12
            <div className="h-1px absolute w-full top-9px bg-[#000]"></div>
          </span>
          <div className="i-bees-limited h-15px w-65px absolute -top-12px left-0" />
        </div>
      );
    }
    if (right?.monthFee == 0 && right?.beforeDiscountMonthFee == 0) {
      return (
        <div className="mb-1 h-5 flex items-center justify-end relative text-right">
          <span className="text-red-500 text-sm font-medium relative text-right">
            {t("free")}
          </span>
        </div>
      );
    }
    return (
      <div className="mb-1 h-5 flex items-center relative">
        <span className="text-black text-sm font-medium">
          {numeral(right?.monthFee).format("0,0.00")} USD * 12
        </span>
      </div>
    );
  };

  const openFeeView = () => {
    if (right?.beforeDiscountOpenCardFee != right?.openCardFee) {
      return (
        <div className="flex items-baseline">
          <div className="mr-6px">
            <span className="text-black text-2xl font-bold mr-1">
              {numeral(right?.openCardFee).format("0,0.00")}
            </span>
            <span className="text-black text-xs font-medium">USDT</span>
          </div>
          <div className="text-xs text-[#666] relative">
            {numeral(right?.beforeDiscountOpenCardFee).format("0,0.00")} USDT
            <div className="h-1px absolute w-70px top-9px bg-black"></div>
            <div className="h-1px absolute -top-14px text-red-500 font-medium">
              {Math.ceil(
                (right?.openCardFee / right?.beforeDiscountOpenCardFee) * 100
              )}
              %OFF
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="text-black text-sm font-medium mb-1">
        {numeral(right?.openCardFee).format("0,0.00")} USDT
      </div>
    );
  };

  useEffect(() => {
    reload();
  }, []);

  return (
    <main className="w-full h-screen bg-white md:bg-[#F5F6F7] overflow-y-auto">
      <header className="w-full px-4 bg-white flex justify-between items-center h-56px">
        <button>
          <div className="w-4 h-4 "></div>
        </button>
        <h3 className="m-0 font-medium">
          {t("apply")} {getLanguage() === "en" ? right?.enName : right?.cnName}
        </h3>
        {isAuth() ? <Logout /> : <Logout name="Log in" />}
      </header>
      <div className="w-full md:max-w-980px md:mt-5 mx-auto bg-white md:pt-5 pb-5">
        <section className="mx-auto">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              scale: 0.8,
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            modules={[EffectCoverflow]}
            onSlideChange={(item) => onSwiperChange(item.activeIndex)}
          >
            {usedRights.map((v: any) => {
              return (
                <SwiperSlide key={v?.rightsId} className="!w-[80%] !md:w-340px">
                  <Card
                    info={{}}
                    coverStyle={v?.coverStyle}
                    coverUrl={v?.coverUrl}
                    onApply={
                      isAuth()
                        ? () => navigate(`/Apply/${v?.rightsId}`)
                        : undefined
                    }
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </section>
        <section className="mt-2 w-full px-4">
          <div className="">
            <Link
              to={`/Equity/${right?.rightsId}`}
              className="w-full flex items-center justify-between text-[#333]"
            >
              <div className="flex items-center font-medium">
                <div className="w-2px h-14px bg-[#FFAC13] mr-1" />
                <span>{t("cardBenefits")}</span>
              </div>
              <span className="block w-4 h-4 i-bees-left?mask text-[#999] transform rotate-180"></span>
            </Link>

            <div className="w-full mt-2 flex justify-between">
              <div className="text-left">
                {openFeeView()}
                <div className="text-[#666] text-xs">{t("cardOpeningFee")}</div>
              </div>

              <div className="text-right">
                {monthFeeView()}
                <div className="text-[#666] text-xs">{t("annualFee")}</div>
              </div>
            </div>

            <div className="w-full mt-3 flex justify-between">
              <div className="text-left">
                <div className="text-black text-sm font-medium">
                  {right?.rechargeFee}
                </div>
                <div className="text-[#666] text-xs">{t("rechargeFee")}</div>
              </div>
              <div className="text-right">
                {right?.consumptionFee == 0 ? (
                  <div className="text-red-500 text-sm font-medium">
                    {t("free")}
                  </div>
                ) : (
                  <div className="text-black text-sm font-medium">
                    {numeral(right?.consumptionFee).format("0,0.00")} USD
                  </div>
                )}
                <div className="text-[#666] text-xs">
                  {t("consumptionHandlingFee")}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-center font-medium">
              <div className="w-2px h-14px bg-[#FFAC13] mr-1" />
              <span>{t("applicationProcess")}</span>
            </div>
            <div className="flex mt-2">
              <div className="flex-col flex items-center mr-3">
                <div className="w-[18px] h-[18px] rounded-full border border-[#FFAC13] text-[#FFAC13] text-[10px] font-bold flex justify-center items-center">
                  1
                </div>
                <div className="h-20px w-1px bg-[#FFAC13]"></div>
                <div className="w-[18px] h-[18px] rounded-full border border-[#FFAC13] text-[#FFAC13] text-[10px] font-bold flex justify-center items-center">
                  2
                </div>
                <div className="h-20px w-1px bg-[#FFAC13]"></div>
                <div className="w-[18px] h-[18px] rounded-full border border-[#FFAC13] text-[#FFAC13] text-[10px] font-bold flex justify-center items-center">
                  3
                </div>
              </div>
              <div className="">
                <div className="mb-2">
                  <div className="text-zinc-800 text-xs font-medium">
                    {t("apply")}
                  </div>
                  <div className="text-stone-500 text-xs">
                    {t("fillInSimplifiedInformation")}
                  </div>
                </div>
                <div className="mb-5">
                  <div className="text-zinc-800 text-xs font-medium">
                    {t("depositCrypto")}
                  </div>
                </div>
                <div className="text-zinc-800 text-xs font-medium">
                  {t("cardOpeningCompleted")}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-center font-medium text-sm">
              <div className="w-2px h-14px bg-[#FFAC13] mr-1" />
              <span>{t("supportConsumptionScenarios")}</span>
            </div>
            <div
              className="mt-2 text-xs text-[#666]"
              dangerouslySetInnerHTML={{ __html: right?.consumeScene }}
            ></div>
          </div>
          {right?.enName?.includes(CardType.Diamond) && (
            <div className="mt-3">
              <div className="flex items-center font-medium text-sm">
                <div className="w-2px h-14px bg-[#FFAC13] mr-1" />
                <span>{t("feature")}</span>
              </div>
              <h3 className="mt-2 text-black font-bold">
                {getPropagation(right?.enName)}
              </h3>
              <div className="mt-2 text-[#FFAC13] leading-5 text-sm">
                <p>1. {t("physicalCardAvailable")}</p>
                <p>2. {t("freeCardReplacementAfterExpiry")}</p>
                <p>3. {t("referralRebate")}</p>
              </div>
            </div>
          )}
          {right?.enName?.includes(CardType.BlackGold) && (
            <div className="mt-3">
              <div className="flex items-center font-medium text-sm">
                <div className="w-2px h-14px bg-[#FFAC13] mr-1" />
                <span>{t("feature")}</span>
              </div>
              <h3 className="mt-2 text-black font-bold">
                {getPropagation(right?.enName)}
              </h3>
              <div className="mt-2 text-[#FFAC13] leading-5 text-sm">
                <p>1. {t("buyOneGetOneFree")}</p>
                <p>2. {t("freePhysicalCard")}</p>
                <p>3. {t("freeCardReplacementAfterExpiry")}</p>
                <p>4. {t("referralRebate")}</p>
                <p>5. {t("moreBenefitsAwait")}</p>
              </div>
            </div>
          )}
          {right?.enName?.includes(CardType.Standard) && (
            <div className="mt-3">
              <div className="flex items-center font-medium text-sm">
                <div className="w-2px h-14px bg-[#FFAC13] mr-1" />
                <span>{t("feature")}</span>
              </div>
              <h3 className="mt-2 text-black font-bold">
                {getPropagation(right?.enName)}
              </h3>
            </div>
          )}
          {right?.enFeatureTitle && right?.cnFeatureTitle && (
            <div className="mt-3">
              <div className="flex items-center font-medium text-sm">
                <div className="w-2px h-14px bg-[#FFAC13] mr-1" />
                <span>{t("feature")}</span>
              </div>
              <h3 className="mt-2 text-black font-bold">
                {getLanguage() == "en"
                  ? right?.enFeatureTitle
                  : right?.cnFeatureTitle}
              </h3>
            </div>
          )}
        </section>
        {isAuth() ? (
          <div className="w-full px-4 mt-4">
            <Button loading={false} onClick={go}>
              {t("apply")}
            </Button>
          </div>
        ) : (
          <div className="w-full mt-4 px-4">
            <Link to="/login" className="btn btn-primary btn-block">
              {t("login")}
            </Link>

            <div className="w-full flex justify-center items-center my-2">
              <div className="border-b border-[#E7E7E7] flex-1 max-w-94px"></div>
              <div className="text-[#666] text-10px mx-2">
                {t("orContinueWith")}
              </div>
              <div className="border-b border-[#E7E7E7] flex-1 max-w-94px"></div>
            </div>

            <div className="w-full px-4 flex justify-center">
              <a
                href={googleAuthUrl}
                className="mr-5 bg-[#F7F7F7] rounded-lg w-15 h-10 flex justify-center items-center"
              >
                <div className="w-6 h-6 i-bees-google" />
              </a>
              <a
                href={appleAuthUrl}
                className="mr-5 bg-[#F7F7F7] rounded-lg w-15 h-10 flex justify-center items-center"
              >
                <div className="w-6 h-7 i-bees-apple" />
              </a>
              <Link
                className="mr-5 bg-[#F7F7F7] rounded-lg w-15 h-10 flex justify-center items-center"
                to="/login"
              >
                <div className="w-6 h-7 i-bees-email1" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
