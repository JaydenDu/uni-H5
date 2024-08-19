import { message } from "./Message";
import * as clipboard from "clipboard-polyfill";

type Props = {
    className?: string;
    content: string;
};

export default ({ className, content }: Props) => {
    const copy = async () => {
        await clipboard.writeText(content);
        message.success("Copied!");
    };
    return (
        <button onClick={copy} className={className}>
            <div className="w-5 h-5 i-bees-copy" />
        </button>
    );
};
