import config from './database/knexfile';

const dbConfig = config;

export { dbConfig };
export { Knex, IDbConfig, IDatabase } from './types/types';

export { PostgresqlDatabase } from './database/PostgresqlDatabase';
export { PostgresqlDatabaseConfig } from './database/PostgresqlDatabaseConfig';
