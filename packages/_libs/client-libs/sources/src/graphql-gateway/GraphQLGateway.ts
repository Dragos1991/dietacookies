import extractFiles from 'extract-files/extractFiles.mjs';
import isExtractableFile from 'extract-files/isExtractableFile.mjs';

import { DataType } from '../http-request';
import type { HttpRequest } from '../http-request';

interface IGraphQlQueryVariables {
    [variableName: string]: any;
}

interface IGraphQlQueryParams {
    query: string;
    variables?: IGraphQlQueryVariables;
    operationName?: string;
}

interface IGraphQlQueryResponse<T> {
    data: T;
    errors?: IGraphQlErrorInfo[];
}

export interface IGraphQlErrorInfo {
    message: string;
    name: string;
    location: Array<{
        line: number;
        column: number;
    }>;
}

export class GraphQLError extends Error {
    public constructor(message: string, private internalErrors: IGraphQlErrorInfo[]) {
        super(message);
        Object.setPrototypeOf(this, GraphQLError.prototype);
    }

    public get errors() {
        return this.internalErrors;
    }
}

export class GraphQLGateway {
    public constructor(private url: string, private http: HttpRequest) {}

    public async rawQuery<T>({ query, variables, operationName }: IGraphQlQueryParams) {
        let requestData: any;

        const { clone, files } = extractFiles(
            {
                query,
                variables,
            },
            isExtractableFile,
        );

        const hasFiles = files && files.size > 0;

        if (hasFiles) {
            const formData = new FormData();
            formData.append('operations', JSON.stringify(clone));

            let i = 0;

            const map: { [key: string]: string[] } = {};

            files.forEach((paths, file) => {
                if (file instanceof File || file instanceof Blob) {
                    map[i++] = paths;
                }
            });

            formData.append('map', JSON.stringify(map));
            i = 0;

            files.forEach((_, file) => {
                if (file instanceof File || file instanceof Blob) {
                    formData.append(`${i++}`, file, file instanceof File ? file.name : undefined);
                }
            });

            requestData = formData;
        } else {
            requestData = {
                operationName,
                variables,
                query,
            };
        }

        const { data, errors } = await this.http.fetchJson<IGraphQlQueryResponse<Partial<T>>>(this.url, {
            method: 'POST',
            dataType: hasFiles ? DataType.Raw : DataType.Json,
            data: requestData,
        });

        return { data, errors };
    }

    public async query<T>({ query, variables, operationName }: IGraphQlQueryParams) {
        const { data, errors } = await this.rawQuery<T>({
            query,
            variables,
            operationName,
        });

        return { data, errors };
    }
}
