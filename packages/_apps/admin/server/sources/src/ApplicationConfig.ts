import type { IApplicationOptions } from './types';

export class ApplicationConfig {
    public constructor(private readonly options: IApplicationOptions) {}

    public get port(): number {
        return this.options.port;
    }

    public get corsOptions(): any {
        return this.options.corsOptions;
    }
}
