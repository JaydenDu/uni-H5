import { useEffect, useState } from "react";

type Props = {
    content: string;
    onConfirm?: () => void;
};
const modal = { confirm: (obj: Props) => {} };
let onConfirm_: () => void;

export const ModalContainer = () => {
    const [visible, setVisible] = useState(false);
    const [isFlying, setIsFlying] = useState(false);
    const [content, setContent] = useState("");

    function close() {
        setIsFlying(false);
    }

    modal.confirm = ({ content, onConfirm }: Props) => {
        setVisible(true);
        setContent(content);
        if (onConfirm) onConfirm_ = onConfirm;
    };

    useEffect(() => {
        if (visible) setIsFlying(true);
    }, [visible]);
    useEffect(() => {
        if (!isFlying) setTimeout(() => setVisible(false), 80);
    }, [isFlying]);

    const modalClass = isFlying ? "bottom-0" : "-bottom-full";
    return (
        <>
            {visible && (
                <div className={`fixed z-100 h-full w-full left-0 bottom-0`}>
                    <div className="bg-[#00000080] w-full h-full"></div>
                    <div className={`w-full h-full absolute left-0 transition-all duration-300 flex justify-center items-center ${modalClass}`}>
                        <section className="w-315px rounded-lg bg-white p-5">
                            <div className="w-full font-medium flex justify-center">{content}</div>
                            <div className="flex mt-9">
                                <button
                                    onClick={close}
                                    className="h-8 flex-1 rounded-lg flex items-center justify-center border border-solid border-[#ccc] text-sm mr-3"
                                >
                                    {t("back")}
                                </button>
                                <button
                                    onClick={async () => {
                                        if (onConfirm_) {
                                            await onConfirm_();
                                            close();
                                        }
                                    }}
                                    className="h-8 flex-1 rounded-lg flex items-center justify-center text-sm bg-[#FFC04D] text-white"
                                >
                                    {t("confirm")}
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            )}
        </>
    );
};

export default modal;
