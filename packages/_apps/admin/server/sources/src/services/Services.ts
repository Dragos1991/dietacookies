import { UserService, Validator } from '@dietacookies/data-access-layer';
import type { PostgresqlDatabase } from '@dietacookies/database-connector';
import type { Logger } from '@dietacookies/logger';

import { Models } from '../models/Models';

export class Services {
    public constructor(private readonly database: PostgresqlDatabase, private readonly log: Logger) {}

    public static factory(database: PostgresqlDatabase, log: Logger) {
        return new Services(database, log);
    }

    private get models() {
        const models = Models.factory(this.database).getModels;
        return models;
    }

    public get services() {
        const { userModel } = this.models;
        const validator = new Validator({
            enableAllErrors: true,
            log: this.log,
        });
        const userService = UserService.factory({
            userModel,
            validator,
            log: this.log,
        });

        return {
            userService,
        };
    }
}
