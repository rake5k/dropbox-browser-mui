import Log4js from 'log4js';

const isProduction = process.env.NODE_ENV === 'production';

const logger = Log4js.getLogger();
logger.level = isProduction ? Log4js.levels.WARN : Log4js.levels.ALL;

export const trace = (msg: string, ...args: any[]) => {
    if (logger.isTraceEnabled()) {
        logger.trace(msg, args);
    }
};

export const debug = (msg: string, ...args: any[]) => {
    if (logger.isDebugEnabled()) {
        logger.debug(msg, args);
    }
};

export const info = (msg: string, ...args: any[]) => {
    if (logger.isInfoEnabled()) {
        logger.info(msg, args);
    }
};

export const warn = (msg: string, ...args: any[]) => {
    if (logger.isWarnEnabled()) {
        logger.warn(msg, args);
    }
};

export const error = (msg: string, ...args: any[]) => {
    if (logger.isErrorEnabled()) {
        logger.error(msg, args);
    }
};
