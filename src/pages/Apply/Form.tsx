import { useEffect, useRef, useState } from "react";
import CountryModal from "../../components/CountryModal";
import {
  applyCard,
  existsEmail,
  existsPhone,
  getAreaInfo,
  getRights,
} from "../../request/home";
import { message } from "../../components/Message";
import Button from "../../components/Button";
import { useParams, Link } from "react-router-dom";
import { initializeApi } from "../../helpers/api";
import { cache } from "../../helpers/cache";
declare let t: Function;

type Props = {
  className?: string;
  ok: Function;
};

enum ExistState {
  Exist = 0,
  NotExist = 1,
  UnCheck = 2,
}

export default ({ ok }: Props) => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("93");
  const [isRead, setIsRead] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const rightsId = Number(id);
  const [rights, setRights] = useState<{ [k: string]: string }>();
  const [isExistPhone, setIsExistPhone] = useState(ExistState.UnCheck);
  const [isExistEmail, setIsExistEmail] = useState(ExistState.UnCheck);

  const checkPhone = () =>
    String(phoneNumber).length > 15 || String(phoneNumber).length < 6;
  const checkEmail = () => !(email.includes("@") && email.includes("."));

  const check = () => {
    if (!lastName) throw new Error(t("pleaseEnterTheLastName"));
    if (!firstName) throw new Error(t("pleaseEnterCardholderName"));
    if (checkPhone()) {
      throw new Error(t("please...phoneNumber"));
    }
    if (email) {
      if (checkEmail()) {
        throw new Error(t("please...emailAddress"));
      }
      if (isExistEmail === ExistState.Exist) {
        throw new Error("");
      }
    }
    if (isExistPhone === ExistState.Exist) {
      throw new Error("");
    }
  };

  const isVerified = () => {
    try {
      check();
      return true;
    } catch (error) {
      return false;
    }
  };

  const fetchExistsPhone = async () => {
    if (checkPhone()) return;
    const result = await existsPhone(countryCode, phoneNumber);
    if (result?.code === 200) {
      if (result?.data?.phoneNumber && !result?.data?.self) {
        setIsExistPhone(ExistState.Exist);
      } else {
        setIsExistPhone(ExistState.NotExist);
      }
    }
  };

  const fetchExistsEmail = async () => {
    if (checkEmail()) return;
    const result = await existsEmail(email);
    if (result?.code === 200) {
      if (result?.data?.email && !result?.data?.self) {
        setIsExistEmail(ExistState.Exist);
      } else {
        setIsExistEmail(ExistState.NotExist);
      }
    }
  };

  const confirm = async () => {
    setLoading(true);
    try {
      check();
      if (!isRead) throw new Error(t("pleaseReadCoin50Agreement"));

      const params = {
        lastName,
        firstName,
        phoneNumber,
        email,
        countryCode,
        rightsId,
      };
      const result = await applyCard(params);
      if (result?.code === 200) {
        const jwt = result?.data?.jwt;
        jwt && initializeApi(jwt);
        ok(result?.data?.id);
      } else {
        throw new Error(result?.message);
      }
    } catch (error: any) {
      if (error?.message) message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

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

  const existPhoneStateView = () => {
    if (isExistPhone === ExistState.Exist) {
      return <div className="w-5 h-5 i-bees-error ml-2"></div>;
    }
    if (isExistPhone === ExistState.NotExist && !checkPhone()) {
      return <div className="w-5 h-5 i-bees-success ml-2"></div>;
    }
  };
  const existEmailStateView = () => {
    if (isExistEmail === ExistState.Exist) {
      return <div className="w-5 h-5 i-bees-error ml-2"></div>;
    }
    if (isExistEmail === ExistState.NotExist && !checkEmail()) {
      return <div className="w-5 h-5 i-bees-success ml-2"></div>;
    }
  };

  return (
    <div className="md:pt-5 px-4">
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
        <div className="flex items-center font-medium">
          <div className="w-2px h-14px bg-[#FFAC13] mr-1" />
          <span>{t("fillInInformation")}</span>
        </div>

        <div className="mt-4">
          <div className="text-sm">
            <div className="text-sm mb-3">
              <span className="font-medium text-[#333]">{t("firstName")}</span>
              <span className="text-[#666]">（{t("fillInEnglish")}）</span>
            </div>
            <div className="w-full h-11 rounded-lg flex items-center bg-[#F5F6F7] px-3">
              <input
                onChange={(e) => setFirstName(e.target.value)}
                className="text-sm bg-[#F5F6F7] outline-none flex-1 flex-shrink-0l"
                placeholder={t("pleaseEnterCardholderName")}
                type="text"
              />
            </div>
          </div>
          <div className="text-sm mt-4">
            <div className="text-sm">
              <span className="font-medium text-[#333]">{t("lastName")}</span>
              <span className="text-[#666]">（{t("fillInEnglish")}）</span>
            </div>
            <div className="w-full h-11 rounded-lg flex items-center bg-[#F5F6F7] mt-3 px-3">
              <input
                onChange={(e) => setLastName(e.target.value)}
                className="text-sm bg-[#F5F6F7] outline-none flex-1 flex-shrink-0"
                placeholder={t("pleaseEnterTheLastName")}
                type="text"
              />
            </div>
          </div>
          <div className="text-sm mt-4">
            <div className="font-medium text-[#333]">
              {t("bindMobilePhoneNumber")}
            </div>
            <div className="flex items-center mt-3">
              <div className="flex-1 w-full h-11 rounded-lg flex items-center bg-[#F5F6F7] px-3">
                <SelectedCountry onSelected={setCountryCode} />
                <input
                  onChange={(e) => {
                    setPhoneNumber(String(e.target.value));
                    setIsExistPhone(ExistState.UnCheck);
                  }}
                  onBlur={fetchExistsPhone}
                  className="text-sm bg-[#F5F6F7] outline-none flex-1 flex-shrink-0"
                  placeholder={t("pleaseEnterPhoneNumber")}
                  type="number"
                />
              </div>

              {existPhoneStateView()}
            </div>
            {isExistPhone === ExistState.Exist && (
              <div className="text-red-500 mt-2 text-xs">
                {t("thePhone...exists")}{" "}
                <Link to="/login" className="ml-2 text-[#FFAC13]">
                  {t("login")}
                </Link>
              </div>
            )}
          </div>
          <div className="text-sm mt-4">
            <div className="font-medium text-[#333]">{t("bindEmail")}</div>
            <div className="flex items-center mt-3">
              <div className="flex-1 w-full h-11 rounded-lg flex items-center bg-[#F5F6F7] px-3">
                <input
                  onChange={(e) => {
                    setEmail(String(e.target.value));
                    setIsExistEmail(ExistState.UnCheck);
                  }}
                  onBlur={fetchExistsEmail}
                  className="text-sm bg-[#F5F6F7] outline-none flex-1 flex-shrink-0"
                  placeholder={t("pleaseEnterYourEmailAddress")}
                  type="text"
                />
              </div>

              {existEmailStateView()}
            </div>
            {isExistEmail === ExistState.Exist && (
              <div className="text-red-500 mt-2 text-xs">
                {t("theEmail...exists")}{" "}
                <Link to="/login" className="ml-2 text-[#FFAC13]">
                  {t("login")}
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center text-xs mt-5">
            <button className="mr-2" onClick={() => setIsRead(!isRead)}>
              {isRead ? (
                <span className="block w-4 h-4 i-bees-agree"></span>
              ) : (
                <div className="w-4 h-4 border border-[#ccc] rounded-full" />
              )}
            </button>
            <div className="flex-1 flex">
              <span className="text-[#666]">{t("iHaveReadAndAgreed")}</span>
              <a
                target="_blank"
                href="https://bee-network.notion.site/Coin50ETF-Bee-Card-Privacy-Policy-Terms-Of-Use-e225c22c33914bcbb630b13f41cf48c0?pvs=74"
                className="text-[#FFAC13]"
              >
                《Coin50 {t("agreement")}》
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="my-7">
        <Button
          disabled={!isVerified()}
          loading={loading}
          onClick={confirm}
          className="h-12 w-full bg-[#FFAC13] rounded-lg text-white text-base font-medium"
        >
          {t("next")}
        </Button>
      </div>
    </div>
  );
};

const SelectedCountry = ({ onSelected }: any) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState("93");

  const fetchAreaInfo = async () => {
    const result = await getAreaInfo();
    if (result?.errorCode === 200) {
      const code = result?.data?.code ?? "93";
      setSelected(code);
      onSelected(code);
    }
  };

  useEffect(() => {
    fetchAreaInfo();
  }, []);
  return (
    <>
      <button
        onClick={() => setVisible(true)}
        className="h-5 border-r border-solid border-[#c4c4c4] flex items-center pr-3 mr-3"
      >
        <span className="mr-1">+{selected}</span>
        <span className="inline-block w-18px h-18px i-bees-down"></span>
      </button>
      <CountryModal
        visible={visible}
        onClose={() => setVisible(false)}
        onOk={(v: string) => {
          setSelected(v);
          onSelected(v);
        }}
      />
    </>
  );
};
