import React, { useState, useEffect } from "react";
import Button from "../../components/Button";
import { message } from "../../components/Message";
import Steps from "../../components/Steps";

const stepText = [
  "Follow a few steps to create your ZZZPay Account.",
  "We sent code on Confirm to the email. Check your spam folder if you don't see it within the next few minutes.",
  "Please enter the password to log in to the account below.",
];

const LoginForm = ({}) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [isExist, setIsExist] = useState(true);
  const [step, setStep] = useState(0);
  const [count, setCount] = useState(0);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [passwordFormat, setPasswordFormat] = useState([
    false,
    false,
    false,
    false,
  ]);
  let jwt = "";
  const [validationError, setValidationError] = useState(null);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const emailValidator = async (val: string) => {
    if (val?.includes("@") && val.includes(".")) return Promise.resolve();

    return Promise.reject(new Error("Please enter the correct email address"));
  };
  const gotoLogin = () => {};

  const codeValidator = (_, val) => {
    if (validationError) return Promise.reject(validationError);
    return Promise.resolve();
  };

  const timeKeeping = () => {
    setCount(60);
    const loop = setInterval(() => {
      if (count > 0) {
        setCount(count - 1);
      } else {
        clearInterval(loop);
      }
    }, 1000);
  };

  const receiveAgain = async () => {
    if (verifyLoading) return;
    setVerifyLoading(true);
    const result = await sendEmailCode(email);
    if (result.code === "ok") {
      setVerifyLoading(false);
      timeKeeping();
    }
    setVerifyLoading(false);
  };

  const next = async () => {
    setLoading(true);
    setValidationError(null);
    try {
      await emailValidator(email);
      if (step === 0) {
        const result = await sendEmailCode(email);
        if (result.code === "ok") {
          setLoading(false);
          setStep(step + 1);
          timeKeeping();
        }
      } else if (step === 1) {
        const result = await verifyEmailCode(formState);
        try {
          if (result?.errorCode === -10372 || result?.errorCode === -10008) {
            setValidationError("Incorrect code. Please check and try again.");
            await emailValidator(email);
          }
        } catch (error) {}

        jwt = result?.data?.jwt;
        if (jwt) {
          setValidationError(null);
          setLoading(false);
          if (RegisterOrFindPassword) initInvitedBy(InvitedCode, jwt);
          setStep(step + 1);
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const passwordChange = (value) => {
    value = String(value);
    setPasswordFormat([
      value.length >= 8 && value.length <= 20,
      !!value.match(/[a-zA-Z]+/),
      !!value.match(/[!@#$%^&*()+_=\[\]\-\{\}\,\.\/\>\<\'\`\~]+/),
      !!value.match(/[0-9]+/),
    ]);
  };

  const back = () => {
    if (step > 0) setStep(step - 1);
    else history.push("/Home");
  };

  const signIn = async () => {
    setLoadingLogin(true);
    try {
      await emailValidator(email);
      if (passwordFormat.every((v) => v)) {
        const result = await userStore.initPasswordAndLogin(
          password,
          jwt,
          !RegisterOrFindPassword
        );
        if (result.data) {
          message.success("Success");
          window.location.reload();
        } else {
          message.error(result.msg);
        }
        if (result?.code === 200 && result.data) {
          history.push("/Home");
          setLoadingLogin(false);
        }
        setLoadingLogin(false);
      }
      setLoadingLogin(false);
    } catch (error) {
      setLoadingLogin(false);
    }
  };

  return (
    <div className="h-screen flex justify-center w-full items-center login">
      <div className="flex h-full w-full">
        <div
          className="bg-[#333] flex-1 relative"
          style={{
            backgroundImage: "linear-gradient(45deg, #f4f6ff, #fff7eb)",
          }}
        >
          <div className="absolute top-51px left-51px">
            <img className="h-8" alt="" />
          </div>
          <div className="text-center absolute top-0 right-0 left-0 bottom-0 m-auto w-531px h-359px">
            <img src="./banner.png " className="w-531px h-359px" alt="" />
          </div>
        </div>
        <div className="login-box_1 flex-1 relative">
          <div className="flex-1 w-full flex-col flex items-center h-full justify-center">
            <div className="min-h-550px">
              <div className="flex justify-center w-406px">
                <div className="login-box w-full h-full relative">
                  <button
                    onClick={back}
                    className="absolute -top-90px -left-147px text-sm flex items-center"
                  >
                    <i className="i-bees-left?mask text-[#ffc04d] inline-block mr-1" />
                    <span className="text-[#ffc04d]">Back</span>
                  </button>
                  <h1 className="font-600 text-32px leading-48px mt-0">
                    {"Create ZZZPay Account"}
                  </h1>
                  <p className="text-18px leading-27px font-400 mb-50px text-[#999]">
                    {stepText[step]}
                  </p>
                  <div className="mb-50px">
                    <Steps
                      titles={["Confirm Email", "Verify", "Set Password"]}
                      value={step}
                    />
                  </div>
                  <div className="mt-12">
                    {step === 0 && (
                      <>
                        <div>
                          <div className="mb-2">Email</div>

                          <div className="flex items-center border border-[#EFEFEF] px-3 h-12 rounded-lg">
                            <div className="i-bees-email?mask text-[#ccc] w-5 h-5 mr-2"></div>
                            <input
                              onChange={(e) => setEmail(e.target.value)}
                              value={email}
                              type="text"
                              placeholder="Enter your email"
                              className="placeholder-[#ccc]"
                            />
                          </div>
                        </div>
                        {isExist && (
                          <div className="text-sm text-[#E44430] mt-8px">
                            <span>
                              The email address you have entered is already
                              registered. Want to
                            </span>
                            <button
                              onClick={gotoLogin}
                              className="underline text-[#FFAD17]"
                            >
                              log in
                            </button>
                            <span>instead?</span>
                          </div>
                        )}
                      </>
                    )}

                    {step === 1 && (
                      <div>
                        <div className="mb-2">Email Code</div>

                        <div className="flex items-center border border-[#EFEFEF] px-3 h-12 rounded-lg">
                          <input
                            onChange={(e) => setCode(e.target.value)}
                            value={code}
                            type="text"
                            placeholder="Enter your email code"
                            className="placeholder-[#ccc]"
                          />
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div>
                        <div className="mb-2">Set Password</div>

                        <div className="flex items-center border border-[#EFEFEF] px-3 h-12 rounded-lg">
                          <div className="i-bees-password?mask text-[#ccc] w-5 h-5 mr-2"></div>
                          <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="text"
                            placeholder="Enter your password"
                            className="placeholder-[#ccc]"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className={password ? "passwordInviter" : ""}>
                    {password && (
                      <>
                        <p className="font-400 text-12px leading-18px text-[#666666]">
                          Your password must contain the following:
                        </p>
                        {passwordFormat.map((passed, index) => (
                          <Regulation
                            key={index}
                            className="font-400 text-12px leading-18px mb-8px"
                            passed={passed}
                          >
                            {
                              [
                                "8-20 characters",
                                "At least 1 letter",
                                "At least 1 symbols",
                                "At least 1 number",
                              ][index]
                            }
                          </Regulation>
                        ))}
                      </>
                    )}
                  </div>
                  <Button
                    className="w-full !rounded-lg mt-60px"
                    onClick={step === 2 ? signIn : next}
                    loading={step === 2 ? loadingLogin : loading}
                    disabled={
                      step === 2
                        ? !passwordFormat.every((i) => i)
                        : (!email && step === 0) || (!code && step === 1)
                    }
                  >
                    {step === 2 ? "Sign in" : "Next"}
                  </Button>

                  {step !== 2 && (
                    <p className="mt-30px text-[#999999] text-center">
                      <span>Already have an account?</span>
                      <button
                        className="text-[#FFAD17] cursor-pointer"
                        onClick={gotoLogin}
                      >
                        Log in
                      </button>
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div>
              <div className="text-center mt-0px">
                <div className="text-xs text-14px font-400 leading-21px text-[#999] h-21px"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Regulation = ({ passed, children }: any) => {
  return (
    <p>
      {passed ? (
        <i className="iconfont icon-Frame1 text-[#52c41a] mr-4px !text-12px" />
      ) : (
        <i className="iconfont icon-Close text-[#ff4d4f] mr-4px !text-12px" />
      )}
      {children}
    </p>
  );
};

export default LoginForm;
