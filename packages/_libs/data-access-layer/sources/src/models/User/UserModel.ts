import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

import {
    PostgresqlDatabase,
    IDatabase,
} from "@dietacookies/database-connector";
import { DatabaseError } from "@dietacookies/services-errors";
import { BaseModel } from "../BaseModel";
import { IUserCreate, IUser, IUserDb, IUserOmitPassword } from "../../database";
import { IUuid } from "../../interfaces";

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
        id: IUuid,
        database: IDatabase | null = null
    ): Promise<IUser> {
        const db = database ? database : this.database;
        try {
            const response: IUserDb[] = await db
                .select("*")
                .from("user")
                .where({
                    id,
                });

            const user: IUser = camelcaseKeys(response[0]);

            return user;
        } catch (error) {
            throw new DatabaseError("Model exist", error, { id });
        }
    }

    public async create(
        data: IUserCreate,
        database: IDatabase | null = null
    ): Promise<IUserOmitPassword> {
        const db = database ? database : this.database;

        try {
            const formatedData = snakecaseKeys(data);
            const response: IUserDb[] = await db
                .table("user")
                .insert(formatedData)
                .returning([
                    "id",
                    "email",
                    "first_name",
                    "last_name",
                    "age",
                    "created_at",
                    "updated_at",
                    "role",
                ]);

            const user: IUserOmitPassword = camelcaseKeys(response[0]);

            return user;
        } catch (error) {
            throw new DatabaseError("Database Error: User Create", error, {
                data,
            });
        }
    }
}
