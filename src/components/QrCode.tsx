import { useEffect, useState } from "react";
import qrCode from "qrcode-generator";

type Props = {
    content: string;
    className?: string;
};

export default ({ content, className }: Props) => {
    const [codeHtml, setCodeHtml] = useState("");

    const generateCode = (content: string) => {
        const qrImage = qrCode(6, "M");
        qrImage.addData(content);
        qrImage.make();

        const s = qrImage.createSvgTag({ margin: 0, scalable: true });
        setCodeHtml(s);
    };

    useEffect(() => {
        generateCode(content);
    }, [content]);

    return <div dangerouslySetInnerHTML={{ __html: codeHtml }} className={className} />;
};
