import { IDbConfig } from '../types/types';

export class PostgresqlDatabaseConfig {
    private configOptions: IDbConfig;
    public constructor() {}

    public load(config: IDbConfig): PostgresqlDatabaseConfig {
        this.configOptions = config;
        return this;
    }

    public get config(): IDbConfig {
        if (!this.configOptions) {
            throw new Error('Missing Config');
        }
        return this.configOptions;
    }
}
