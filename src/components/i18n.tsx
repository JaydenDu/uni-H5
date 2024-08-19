import { useState, useEffect, Fragment } from "react";
import enResources from "../locale/en.json";

let eventCallback: Function | undefined;
const resources: { [k: string]: { [k: string]: string } } = {};

let language = "en";

const resourcesObj: { [k: string]: Function } = {
    "zh-Hans": () => import("../locale/zh-Hans.json"),
    "zh-Hant": () => import("../locale/zh-Hant.json"),
};
const keyMap: { [k: string]: string } = {
    "zh-CN": "zh-Hans",
    "zh-TW": "zh-Hant",
    zh: "zh-Hans",
    "zh-HK": "zh-Hans",
};

const fetchResources = async (l: string) => {
    const importResources = resourcesObj[l];
    const res = (await importResources()).default;
    resources[l] = res;
};

export const t = (key: string, params?: { [k: string]: string }) => {
    const text = (resources[language] ?? enResources)?.[key];
    if (!text) return key;
    if (!params) return text;
    const keys = Object.keys(params);
    if (keys.length === 0) return text;
    return keys.reduce((a, c) => a?.replaceAll(`{{${c}}}`, params[c]), text);
};

export const changeLanguage = async (l: string) => {
    const lng = resourcesObj[l] ? l : keyMap[l];
    const def = "en";
    if (lng && lng !== def) {
        await fetchResources(lng);
    }
    language = lng ?? def;
    eventCallback?.();
};

export const getLanguage = () => language;

type Props = {
    children: React.ReactNode;
};

export default ({ children }: Props) => {
    const [timestamp, setTimestamp] = useState(0);

    useEffect(() => {
        eventCallback = () => {
            setTimestamp(Date.now());
        };
    }, []);

    return <Fragment key={timestamp}>{children}</Fragment>;
};
