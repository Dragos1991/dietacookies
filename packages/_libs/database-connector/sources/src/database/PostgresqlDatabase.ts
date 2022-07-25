import knex from 'knex';

import type { IDatabase } from '../types/types';
import type { PostgresqlDatabaseConfig } from './PostgresqlDatabaseConfig';

export class PostgresqlDatabase {
    private $database: IDatabase;

    public constructor(private postgresConfig: PostgresqlDatabaseConfig) {
        this.$database = knex(this.postgresConfig.config.development);
    }

    public get database() {
        return this.$database;
    }
}
