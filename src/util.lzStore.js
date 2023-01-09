import LZString from "lz-string";

export const getItem = (key) => {
    const data = window.localStorage.getItem(key);
    return LZString.decompress(data);
};

export const setItem = (key, data) => {
    const toStore = LZString.compress(data);
    return window.localStorage.setItem(key, toStore);
};
