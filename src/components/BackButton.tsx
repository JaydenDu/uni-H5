import { useNavigate } from "react-router-dom";
type Props = {
  onClick?: () => void;
};
export default ({ onClick }: Props) => {
  const navigate = useNavigate();
  const back = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };
  return (
    <button className="border-none bg-transparent p-1" onClick={back}>
      <div className="i-bees-left w-5 h-5"></div>
    </button>
  );
};
