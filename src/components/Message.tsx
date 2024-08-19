import { useEffect, useState } from "react";

interface Message {
    error: Function;
    success: Function;
    destroy: Function;
}

enum MessageTypeMap {
    default = 0,
    success = 1,
    error = 2,
}

export const message: Message = {
    error: () => {},
    success: () => {},
    destroy: () => {},
};

export const MessageContainer = () => {
    const [content, setContent] = useState("");
    const [type, setType] = useState(MessageTypeMap.default);

    const setup = (text: string, type: MessageTypeMap, time: number) => {
        setContent(text);
        setType(type);
        setTimeout(() => {
            setContent("");
        }, time);
    };

    message.success = (text: string, time: number = 3000) => {
        setup(text, MessageTypeMap.success, time);
    };

    message.error = (text: string, time: number = 3000) => {
        setup(text, MessageTypeMap.error, time);
    };

    message.destroy = () => {
        setContent("");
    };

    if (!content) return <></>;

    if (type === MessageTypeMap.success) return <MessageContent bgClass="bg-[#46A147]" iconClass="i-bees-success" content={content} />;
    else if (type === MessageTypeMap.error) return <MessageContent bgClass="bg-[#E44430]" iconClass="i-bees-error" content={content} />;
};

const MessageContent = ({ bgClass, iconClass, content }) => {
    return (
        <div className="fixed top-4 w-full pointer-events-none z-9999 flex justify-center">
            <div className="w-full max-w-[343px] mx-4 shadow rounded-lg overflow-hidden flex ">
                <div className={`w-1 ${bgClass}`}></div>
                <div className="flex-1 flex items-start p-3 bg-white">
                    <div className={`w-5 h-5 mr-2 ${iconClass}`}></div>
                    <span className="text-black text-sm font-normal font-['SF Pro Text'] leading-tight">{content}</span>
                </div>
            </div>
        </div>
    );
};
