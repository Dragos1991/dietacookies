import { PostgresqlDatabase } from "@dietacookies/database-connector";
import { UserService } from "@dietacookies/data-access-layer";
import { Models } from "../models/Models";

export class Services {
    private $database: PostgresqlDatabase;

    public constructor(database: PostgresqlDatabase) {
        this.$database = database;
    }

    public static factory(database: PostgresqlDatabase) {
        return new Services(database);
    }

    private get models() {
        const models = Models.factory(this.$database).getModels;
        return models;
    }

    public get services() {
        const { userModel } = this.models;
        const userService = UserService.factory({ userModel });

        return {
            userService,
        };
    }
}
