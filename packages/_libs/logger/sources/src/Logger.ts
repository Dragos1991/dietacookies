import * as winston from 'winston';
import { destroyCircular } from './destroyCircular';

export type ILoggerOptions = winston.LoggerOptions;

enum Levels {
    error = 'error',
    warning = 'warning',
}

interface IReservedAttributes {}
type MetaArgs = (Record<string, any> & Partial<Record<keyof IReservedAttributes, never>>) | string | Error;

export class Logger {
    private winstoneLogger: winston.Logger;
    private loggingEnabled = true;
    public maxDepth: 10;

    public constructor(private options: winston.LoggerOptions) {
        this.winstoneLogger = winston.createLogger({
            ...this.options,
            levels: winston.config.syslog.levels,
        });
    }

    public static get defaults(): ILoggerOptions {
        const myFormat = winston.format.printf(({ level, message, label, timestamp, meta }) => {
            let format = `${timestamp} ` + (label ? `[${label}] ` : '') + `${level}: ${message}`;
            if (meta && Object.keys(meta).length) {
                if (process.env.NODE_ENV === 'production') {
                    format += ' ' + JSON.stringify(meta);
                } else {
                    if (level === 'info' && message === 'Access log') {
                        format += ' ' + JSON.stringify(meta);
                    } else {
                        format += '\n' + JSON.stringify(meta, null, 2);
                    }
                }
            }
            return format;
        });
        const options: ILoggerOptions = {
            level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.splat(),
                        winston.format.simple(),
                        winston.format.timestamp({
                            format: 'dd/MMM/YYYY:HH:mm:ss ZZ',
                        }),
                        myFormat,
                        winston.format.colorize({ all: true }),
                    ),
                }),
            ],
        };
        return options;
    }

    private emitLogMessage(level: Levels, message: string, meta?: MetaArgs) {
        if (this.loggingEnabled) {
            let logEntry: winston.LogEntry = {
                message,
                level,
            };

            try {
                if (meta) {
                    logEntry = { ...logEntry, meta: this.mapObjects(meta) };
                }
                this.winstoneLogger.log(logEntry);
            } catch (error) {
                console.error('Failed to write log entry', {
                    error,
                    level,
                    message,
                    meta,
                });
            }
        }

        return this;
    }

    private mapObjects(meta: Record<string, any> | any, depth = 0) {
        try {
            let item: Record<string, any> = {};
            if (meta instanceof Error) {
                item = { error: this.readError(this.destroyCircular(meta)) };
            } else if (Array.isArray(meta)) {
                const arrayClone: any[] = [];
                meta.map(i => this.mapObjects(i));
                meta.forEach(element => {
                    arrayClone.push(this.mapObjects(element, depth));
                });
                return arrayClone;
            } else if (typeof meta === 'object') {
                if (meta === null || meta === undefined) {
                    return meta;
                } else {
                    const keys = Object.keys(meta);
                    if (keys.length > 0) {
                        keys.map(key => {
                            const value = meta[key];
                            if (value instanceof Error) {
                                item[key] = this.readError(value);
                            } else {
                                if (depth < this.maxDepth) {
                                    item[key] = this.mapObjects(value, ++depth);
                                } else {
                                    item[key] = this.destroyCircular(value);
                                }
                            }
                        });
                    }
                }
            } else {
                return this.destroyCircular(meta);
            }

            return item;
        } catch (error) {
            return { ...meta, ':LoggerError': error };
        }
    }
    private readError(value: Error) {
        return {
            message: value.message,
            name: value.name,
            stack: value.stack,
            ...(value.hasOwnProperty('code') ? { ':error:code': (value as any).code } : {}),
        };
    }

    private destroyCircular(value: Record<string, any>) {
        const maxDepth = this.maxDepth;
        if (typeof value === 'object' && value !== null) {
            return destroyCircular({
                from: value,
                seen: [],
                forceEnumerable: true,
                maxDepth,
                depth: 0,
            });
        } else {
            return value;
        }
    }

    public error(message: string, meta?: MetaArgs): Logger {
        return this.emitLogMessage(Levels.error, message, meta);
    }
    public warning(message: string, meta?: MetaArgs): Logger {
        return this.emitLogMessage(Levels.warning, message, meta);
    }
}
