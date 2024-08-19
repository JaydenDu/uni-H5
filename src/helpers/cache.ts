export const cache = async (k: string, run: Function, cb: Function) => {
    const cacheResult = localStorage.getItem(k);
    if (cacheResult) cb(JSON.parse(cacheResult));
    const result = await run();
    if (result) {
        localStorage.setItem(k, JSON.stringify(result));
        cb(result);
    }
};
