import camelcaseKeys from "camelcase-keys";

import {
    PostgresqlDatabase,
    IDatabase,
} from "@dietacookies/database-connector";
import { DatabaseError } from "@dietacookies/services-errors";
import { BaseModel } from "../BaseModel";

export class UserModel extends BaseModel {
    protected db: PostgresqlDatabase;

    public constructor(
        protected props: {
            database: PostgresqlDatabase;
        }
    ) {
        super();
        this.db = this.props.database;
    }

    public static factory(props: { database: PostgresqlDatabase }): UserModel {
        const opts = { ...props };
        return new UserModel(opts);
    }

    public async load(
        id: string,
        database: IDatabase | null = null
    ): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        age: number;
        password: string;
        email: string;
    }> {
        const db = database ? database : this.database;
        try {
            const response = await db.select("*").from("user").where({
                id,
            });

            const user = camelcaseKeys(response[0]);

            return user;
        } catch (error) {
            throw new DatabaseError("Model exist", error, { id });
        }
    }
}
