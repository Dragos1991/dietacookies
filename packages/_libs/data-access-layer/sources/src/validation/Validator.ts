import fs from 'fs';
import path from 'path';

import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import type { AnyValidateFunction, ErrorObject } from 'ajv/dist/core';

import type { Logger } from '@dietacookies/logger';

import { ValidatorError } from './ValidatorError';

export enum ValidationSchema {
    Uuid = '@dietacookies/schema/uuid',
    UserCreate = '@dietacookies/schema/user#/definitions/.Create',
    UserUpdate = '@dietacookies/schema/user#/definitions/.Update',
    UserAuthenticate = '@dietacookies/schema/user#/definitions/.Authenticate',
}

type IData = unknown;

interface IValidate {
    isValid: boolean | PromiseLike<any>;
    errors?: null | ErrorObject[];
}

/**
 *  This class is used to validate data using json schema files
 */
export class Validator {
    private ajv: Ajv;
    private readonly defaultDirName = `${__dirname}/schemas`;

    protected compiled: Map<string, AnyValidateFunction> = new Map();
    public constructor(
        protected props: {
            log: Logger;
            enableAllErrors: boolean;
        },
    ) {
        const allSchemas: Array<Record<string, unknown>> = [];
        const files = this.getFiles();

        files.forEach(path => {
            try {
                const toAdd = JSON.parse(fs.readFileSync(path, 'utf8'));
                allSchemas.push(toAdd);
            } catch (error) {
                console.log('Error parsing path: ' + path, error);
            }
        });

        this.ajv = addFormats(
            new Ajv({
                allErrors: this.props.enableAllErrors,
                schemas: allSchemas,
            }),
        );

        let i: keyof typeof ValidationSchema;

        for (i in ValidationSchema) {
            const func = this.ajv.getSchema(ValidationSchema[i]);
            if (func) {
                this.compiled.set(ValidationSchema[i], func);
                try {
                    func({ please: 'compile' });
                    console.log('Validation schemas compilation done');
                } catch (error) {
                    console.log('Validator init error', error);
                }
            }
        }
    }

    public static factory(props: { enableAllErrors: boolean; log: Logger }): Validator {
        const { enableAllErrors, log } = props;
        return new Validator({
            enableAllErrors,
            log,
        });
    }

    public validate(data: IData, schema: ValidationSchema): IValidate {
        try {
            const validate = this.compiled.get(schema) as AnyValidateFunction<any>;

            const result = {
                isValid: validate(data),
                errors: validate?.errors,
            };

            if (!result.isValid) {
                this.props.log.warning('Validation failed', {
                    data,
                    schema,
                    errors: result.errors,
                });
            }

            return result;
        } catch (error) {
            throw new ValidatorError('Validation failed ', { error });
        }
    }

    private getFiles(dirName = '', fileList: string[] = []) {
        try {
            if (!dirName) {
                dirName = this.defaultDirName;
            }

            let list = fileList;

            fs.readdirSync(dirName).forEach(file => {
                list = fs.statSync(path.join(dirName, file)).isDirectory()
                    ? this.getFiles(path.join(dirName, file), list)
                    : list.concat(path.join(dirName, file));
            });
            return list;
        } catch (error) {
            console.log('Error on getting schema fles', error);
            throw error;
        }
    }
}
