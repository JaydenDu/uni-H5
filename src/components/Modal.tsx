import { useEffect, useState } from "react";

type Props = {
    visible: boolean;
    children: React.ReactNode;
    isBottom?: boolean;
    onMaskClick?: Function;
};

const Modal = ({ visible, children, isBottom, onMaskClick }: Props) => {
    const [visible_, setVisible] = useState(visible || false);
    const [isFlying, setIsFlying] = useState(visible || false);

    function open() {
        setVisible(true);
    }

    function close() {
        setIsFlying(false);
    }

    useEffect(() => {
        if (visible_) setIsFlying(true);
    }, [visible_]);
    useEffect(() => {
        if (!isFlying) setTimeout(() => setVisible(false), 80);
    }, [isFlying]);
    useEffect(() => {
        visible ? open() : close();
    }, [visible]);

    const modalClass = isFlying ? "bottom-0" : "-bottom-full";
    const bottomClass = isBottom ? "items-end" : "items-center";
    return (
        <>
            {visible_ && (
                <div className={`fixed z-1000 h-full w-full left-0 bottom-0`}>
                    <div onClick={onMaskClick} className="bg-[#00000080] w-full h-full"></div>
                    <div
                        className={`w-full h-full absolute left-0 transition-all duration-300 flex justify-center pointer-events-none ${bottomClass} ${modalClass}`}
                    >
                        <div className="pointer-events-auto">{children}</div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
