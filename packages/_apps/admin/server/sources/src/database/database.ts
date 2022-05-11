import {
    dbConfig,
    PostgresqlDatabase,
    PostgresqlDatabaseConfig,
} from "@dietacookies/database-connector";

const config = new PostgresqlDatabaseConfig().load(dbConfig);
export const database = new PostgresqlDatabase(config);
