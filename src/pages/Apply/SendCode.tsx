import { useState } from "react";
import Countdown from "../../components/Countdown";
declare let t: Function;

type Props = {
  onEnd?: Function;
  onRetry: Function;
};

export default ({ onEnd, onRetry }: Props) => {
  const [start, setStart] = useState(Date.now());
  const [isElapsing, setIsElapsing] = useState(false);
  const [isFirst, setIsFirst] = useState(true);

  const retry = async () => {
    setIsElapsing(true);
    setStart(Date.now());
    setIsFirst(false);
    await onRetry();
  };

  const end = () => {
    setIsElapsing(false);
    onEnd?.();
  };

  if (isElapsing)
    return (
      <div className="opacity-50 text-black text-sm">
        {t("tryAgain")}(<Countdown start={start} max={60} onEnd={end} />
        s)
      </div>
    );
  if (isFirst)
    return (
      <button onClick={retry} className="text-[#FFAC13] text-sm">
        {t("getVerificationCode")}
      </button>
    );

  return (
    <button onClick={retry} className="text-[#FFAC13] text-sm">
      {t("tryAgain")}
    </button>
  );
};
