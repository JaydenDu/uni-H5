import { useState, useEffect, createContext, useContext } from "react";
import { getAllRights, getAppleAuthUrl, getGoogleAuthUrl, getUserCards } from "../request/home";
import { cache } from "../helpers/cache";

const CardContext = createContext({ cards: [], allRights: [] } as any);

export default ({ children }: any) => {
    const [cards, setCards] = useState<any[]>([]);
    const [allRights, setAllRights] = useState<any[]>([]);
    const [googleAuthUrl, setGoogleAuthUrl] = useState("");
    const [appleAuthUrl, setAppleAuthUrl] = useState("");

    const fetchCardState = () => {
        cache("getUserCards", getUserCards, (result: any) => {
            if (result?.data) {
                setCards(result?.data);
            }
        });
    };

    const fetchRights = async () => {
        cache(`getAllRights`, getAllRights, (result: any) => {
            if (result?.data) {
                setAllRights(
                    result?.data?.sort((a: any, b: any) => {
                        if (a?.rightsId === 5) return -1;
                        if (b?.rightsId === 5) return 1;
                        return 0;
                    }) || []
                );
            } else {
                setAllRights([]);
            }
        });
    };

    const fetchGoogleAuthUrl = async () => {
        const result = await getGoogleAuthUrl();
        setGoogleAuthUrl(result?.data ?? "");
    };

    const fetchAppleAuthUrl = async () => {
        const result = await getAppleAuthUrl();
        setAppleAuthUrl(result?.data ?? "");
    };

    useEffect(() => {
        fetchRights();
    }, []);

    return (
        <CardContext.Provider
            value={{
                cards,
                allRights,
                fetchRights,
                googleAuthUrl,
                appleAuthUrl,
            }}
        >
            {children}
        </CardContext.Provider>
    );
};

export const useCard = () => {
    return useContext(CardContext);
};
