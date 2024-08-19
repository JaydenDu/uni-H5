import { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import SendCode from "../Apply/SendCode";
import { message } from "../../components/Message";
import {
  appleAuthUrl,
  getUserCards,
  googleAuthUrl,
  loginWithEmail,
  sendEmailCodeForLogin,
} from "../../request/home";
import { useNavigate } from "react-router-dom";
import { initializeApi } from "../../helpers/api";
import { useCard } from "../../providers/CardProviders";
import { Popover, Toast } from "antd-mobile";
declare let t: Function;

export default () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const { fetchRights } = useCard();
  const [sended, setSended] = useState(false);

  const sendEmailCode = async () => {
    if (email) {
      const result = await sendEmailCodeForLogin({ email });
      if (result?.code === 200) {
        setSended(true);
      } else {
        message.error(result?.message);
      }
    } else {
      message.error(t("pleaseEnterYourEmailAddress"));
    }
  };

  const go = async () => {
    await fetchRights();
    const result = await getUserCards();
    if (result?.data?.length > 0) {
      navigate("/Card", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };

  const login = async () => {
    setLoading(true);
    try {
      const result = await loginWithEmail({ email, code });
      if (result?.code == 200) {
        localStorage.setItem("email", email);
        initializeApi(result?.data?.jwt);
        await go();
      } else {
        message.error(result?.message);
      }
    } catch (error) {
      message.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      setSended(false);
    };
  }, []);
  return (
    <div className="h-screen flex justify-center w-full items-center login">
      <div className="flex h-full w-full">
        <div
          className="flex-1 relative md:block hidden"
          style={{
            backgroundImage:
              "linear-gradient(180deg, #271501 0%, #081422 100%)",
          }}
        >
          <div className="absolute bottom-0 left-51px">
            <img src="./bg.png" alt="" />
          </div>
        </div>
        <div className="flex-1 relative">
          <div className="flex-1 w-full flex-col flex items-center h-full justify-center">
            <div className="w-full min-h-550px">
              <div className="flex justify-center w-full md:w-406px px-4 md:p-0 mx-auto">
                <div className="w-full h-full">
                  <h1 className="font-600 text-32px leading-48px mt-0">
                    {t("login")}
                  </h1>

                  <div className="mt-5">
                    <div>
                      <div className="mb-2 font-500">{t("email")}</div>

                      <div className="flex items-center border border-[#EFEFEF] px-3 h-12 rounded-lg">
                        <div className="i-bees-email?mask text-[#ccc] w-5 h-5 mr-2"></div>
                        <input
                          type="text"
                          onChange={(e: any) => {
                            setEmail(e.target.value);
                            setSended(false);
                          }}
                          placeholder="Enter your email"
                          className="placeholder-[#ccc]"
                        />
                      </div>
                    </div>
                    <div className="mt-5">
                      <div className="mb-2 font-500">{t("code")}</div>

                      <div className="flex items-center border border-[#EFEFEF] px-3 h-12 rounded-lg justify-between">
                        <input
                          type="text"
                          onChange={(e: any) => setCode(e.target.value)}
                          placeholder="Enter code"
                          className="placeholder-[#ccc] flex-1 flex-shrink-0 mr-2"
                        />
                        <Popover
                          visible={sended}
                          content={
                            <div className="text-sm max-w-48">
                              {t("theEmail...folder")}
                            </div>
                          }
                          placement="top-end"
                        >
                          <div>
                            <SendCode onRetry={sendEmailCode} />
                          </div>
                        </Popover>
                      </div>
                    </div>
                  </div>

                  <Button
                    disabled={!(email && code)}
                    loading={loading}
                    onClick={login}
                    className="mt-7"
                  >
                    {t("login")}
                  </Button>

                  <div className="w-full flex justify-center items-center my-5">
                    <div className="border-b border-[#E7E7E7] flex-1 max-w-94px"></div>
                    <div className="text-[#666] text-sm mx-2">
                      {t("orContinueWith")}
                    </div>
                    <div className="border-b border-[#E7E7E7] flex-1 max-w-94px"></div>
                  </div>
                  <div className="w-full mt-4 flex justify-between items-end">
                    <a
                      href={googleAuthUrl}
                      className="mr-5 bg-[#F7F7F7] rounded-lg w-130px h-68px flex justify-center items-center"
                    >
                      <div className="w-6 h-6 i-bees-google" />
                    </a>
                    <a
                      href={appleAuthUrl}
                      className="bg-[#F7F7F7] rounded-lg w-130px h-68px flex justify-center items-center"
                    >
                      <div className="w-6 h-7 i-bees-apple" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
