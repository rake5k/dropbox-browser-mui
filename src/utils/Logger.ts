import _ from 'lodash-es';
import log, { LogLevelNumbers } from 'loglevel';

function isNum(level: string) {
    return !_.isNaN(level);
}

const convertLogLevel = (
    level: string | undefined,
): LogLevelNumbers | undefined => {
    if (!level) {
        log.debug(`No specific log level provided, will set the default one.`);
        return;
    }

    if (isNum(level) && _.toNumber(level) <= log.levels.SILENT) {
        return _.toNumber(level) as LogLevelNumbers;
    }

    switch (level.toUpperCase()) {
        case 'TRACE':
            return log.levels.TRACE;
        case 'DEBUG':
            return log.levels.DEBUG;
        case 'INFO':
            return log.levels.INFO;
        case 'WARN':
            return log.levels.WARN;
        case 'ERROR':
            return log.levels.ERROR;
        case 'SILENT':
            return log.levels.SILENT;
        default:
            throw new Error(`Invalid log level \`${level}\` provided!`);
    }
};

const getLogLevelName = (level: LogLevelNumbers): string => {
    switch (level) {
        case log.levels.TRACE:
            return 'TRACE';
        case log.levels.DEBUG:
            return 'DEBUG';
        case log.levels.INFO:
            return 'INFO';
        case log.levels.WARN:
            return 'WARN';
        case log.levels.ERROR:
            return 'ERROR';
        case log.levels.SILENT:
            return 'SILENT';
        default:
            throw new Error(`Invalid log level number \`${level}\` provided!`);
    }
};

const isProduction = import.meta.env.PROD === true;
const defaultLevel = isProduction ? log.levels.WARN : log.levels.TRACE;
const selectedLevel =
    convertLogLevel(import.meta.env.VITE_LOG_LEVEL) || defaultLevel;
log.setLevel(selectedLevel);
log.info(`Log level set to \`${getLogLevelName(log.getLevel())}\`.`);

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
