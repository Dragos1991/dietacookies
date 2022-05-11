import { PostgresqlDatabase } from "@dietacookies/database-connector";
import { UserModel } from "@dietacookies/data-access-layer";

export class Models {
    private $database: PostgresqlDatabase;

    public constructor(database: PostgresqlDatabase) {
        this.$database = database;
    }

    public static factory(database: PostgresqlDatabase): Models {
        return new Models(database);
    }

    private get userModel(): UserModel {
        return UserModel.factory({ database: this.$database });
    }

    public get getModels() {
        return {
            userModel: this.userModel,
        };
    }
}
