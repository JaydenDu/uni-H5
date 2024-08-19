import { get, joinUrl, post } from "../helpers/api";

type Data = { [k: string]: string | number };

export const getCardInfo = (id: string) => get("/card-server/user/card/info", { id });

export const applyCard = (data: Data) => post("/card-server/user/card/apply", data);

export const sendSmsVerifyCode = (data: Data) => post("/card-server/user/card/sendSmsVerifyCode", data);

export const sendEmailVerifyCode = (data: Data) => post("/card-server/user/card/sendEmailVerifyCode", data);

export const verifyEmailVerifyCode = (code: string) => get("/card-server/user/card/verifyEmailVerifyCode", { code });

export const verifySmsVerifyCode = (code: string) => get("/card-server/user/card/verifySmsVerifyCode", { code });

export const triggerCheck = () => get("/card-server/user/card/triggerCheck");

export const getCardState = (id: string) => get("/card-server/user/card/state", { id });

export const getTransactions = (data: Data) => post("/card-server/user/card/transactions", data);

export const getRights = (rightsId: number | string) => get("/card-server/user/card/event/rights", { rightsId });

export const bookingCard = () => get("/card-server/user/card/booking");

export const getCryptoTransactions = (data: Data) => post("/card-server/user/card/cryptoTransactions", data);

export const sendEmailCodeForLogin = (data: Data) => post("/card-server/user/login/email/sendCode", data);

export const loginWithEmail = (data: Data) => post("/card-server/user/login/email", data);

export const getAllRights = () => get("/card-server/agent/card/rights");

export const getUserCards = () => get("/card-server/user/card/list");

export const multipleApply = (rightsId: number | string) => post("/card-server/user/card/multipleApply", { rightsId });

export const transfer = (data: Data) => post("/card-server/user/card/transfer", data);

export const getGoogleAuthUrl = () => get("/card-server/login/google/authorize_url");

export const getAppleAuthUrl = () => get("/card-server/login/apple/authorize_url");

export const getAreaInfo = () => get("/card-server/user/areaInfo");

export const logout = () => get("/card-server/user/logout");

export const existsPhone = (countryCode: string, phoneNumber: string) => get("/card-server/user/existsPhone", { countryCode, phoneNumber });

export const existsEmail = (email: string) => get("/card-server/user/existsEmail", { email });

export const googleAuthUrl = joinUrl("/card-server/login/google/authorize_url");

export const appleAuthUrl = joinUrl("/card-server/login/apple/authorize_url");
