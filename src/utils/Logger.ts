import log from 'loglevel';

const isProduction = process.env.NODE_ENV === 'production';
const level = isProduction ? log.levels.WARN : log.levels.TRACE;
log.setLevel(level);

export const trace = (msg: string, ...args: any[]) => {
    log.trace(msg, args);
};

export const debug = (msg: string, ...args: any[]) => {
    log.debug(msg, args);
};

export const info = (msg: string, ...args: any[]) => {
    log.info(msg, args);
};

export const warn = (msg: string, ...args: any[]) => {
    log.warn(msg, args);
};

export const error = (msg: string, ...args: any[]) => {
    log.error(msg, args);
};
