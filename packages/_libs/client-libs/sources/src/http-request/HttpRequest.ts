export interface IHttpRequestOptions {
    method?: string;
    timeout?: number;
    data?: any;
    dataType?: DataType;
}

export enum DataType {
    Json = 0,
    Raw,
}

export class HttpRequest {
    public async fetch(url: string, options?: IHttpRequestOptions) {
        return await new Promise<string>((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.addEventListener('load', e => {
                const target = e.target as XMLHttpRequest;
                if (target.status >= 200 && target.status < 300) {
                    resolve(target.responseText);
                } else {
                    reject({
                        status: target.status,
                        response: target.response,
                    });
                }
            });
            request.addEventListener('error', e => {
                reject(e);
            });

            let data: any = void 0;
            let method = 'GET';
            if (options) {
                if (options.method) {
                    method = options.method;
                }
            }
            request.open(method, url, true);

            if (options) {
                if (options.timeout) {
                    request.timeout = options.timeout;
                }
                if (options.data) {
                    if (method.toLowerCase() === 'get') {
                        throw new Error("Can't send data with GET method. Use POST instead");
                    }

                    const dataType = options.dataType || DataType.Json;
                    if (dataType === DataType.Json) {
                        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
                        data = JSON.stringify(options.data);
                    } else {
                        data = options.data;
                    }
                }
            }

            request.send(data);
        });
    }

    public async fetchJson<T>(url: string, options?: IHttpRequestOptions) {
        return await this.fetch(url, options).then(result => JSON.parse(result) as T);
    }
}
