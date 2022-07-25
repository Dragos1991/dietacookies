import { UserModel } from '@dietacookies/data-access-layer';
import type { PostgresqlDatabase } from '@dietacookies/database-connector';

export class Models {
    public constructor(public readonly database: PostgresqlDatabase) {}

    public static factory(database: PostgresqlDatabase): Models {
        return new Models(database);
    }

    private get userModel(): UserModel {
        return UserModel.factory({ database: this.database });
    }

    public get getModels() {
        return {
            userModel: this.userModel,
        };
    }
}
