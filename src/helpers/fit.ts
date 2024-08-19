// Design size
const dw = 375;

const r = window.screen.width / dw;

export const fit = (px: number) => px * r;
