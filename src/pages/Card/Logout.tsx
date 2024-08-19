import { useNavigate } from "react-router-dom";
import { removeAuth } from "../../helpers/api";
import { logout } from "../../request/home";

export default ({ name }: { name?: string }) => {
    const navigate = useNavigate();

    return (
        <button
            onClick={async () => {
                logout();
                removeAuth();
                navigate("/Login", { replace: true });
            }}
            className="px-2 py-2px rounded-lg border border-[#666] whitespace-nowrap"
        >
            {name ?? "Log out"}
        </button>
    );
};
