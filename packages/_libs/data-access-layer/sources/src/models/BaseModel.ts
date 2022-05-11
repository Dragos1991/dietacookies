import type {
    IDatabase,
    PostgresqlDatabase,
} from "@dietacookies/database-connector";

export abstract class BaseModel {
    protected abstract db: PostgresqlDatabase;

    protected get database(): IDatabase {
        return this.db.database;
    }
}
