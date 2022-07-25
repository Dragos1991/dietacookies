import { PostgresqlDatabase, PostgresqlDatabaseConfig, dbConfig } from '@dietacookies/database-connector';

const config = new PostgresqlDatabaseConfig().load(dbConfig);

export const database = new PostgresqlDatabase(config);
