import type { PostgresqlDatabase } from '@dietacookies/database-connector';
import { DatabaseError } from '@dietacookies/services-errors';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

import type { ILoadUserBy, IUser, IUserCreate, IUserDb, IUserOmitPassword, IUserUpdate } from '../../database';
import type { IUuid } from '../../interfaces';
import { BaseModel } from '../BaseModel';

export class UserModel extends BaseModel {
    protected db: PostgresqlDatabase;

    public constructor(
        protected props: {
            database: PostgresqlDatabase;
        },
    ) {
        super();
        this.db = this.props.database;
    }

    public static factory(props: { database: PostgresqlDatabase }): UserModel {
        return new UserModel(props);
    }

    public async loadBy(params: ILoadUserBy): Promise<IUser> {
        try {
            const response: IUserDb[] = await this.database
                .select('*')
                .from('user')
                .where({
                    ...params,
                });

            const user: IUser = camelcaseKeys(response[0]);

            return user;
        } catch (error) {
            throw new DatabaseError('Model exist', error, { params });
        }
    }

    public async loadById(id: IUuid): Promise<IUser> {
        try {
            const user = await this.loadBy({ id });
            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async loadByEmail(email: string): Promise<IUser> {
        try {
            const user = await this.loadBy({ email });
            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async create(data: IUserCreate): Promise<IUserOmitPassword> {
        const db = this.database;

        try {
            const formatedData = snakecaseKeys(data);
            const response: IUserDb[] = await db
                .table('user')
                .insert(formatedData)
                .returning(['id', 'email', 'first_name', 'last_name', 'age', 'created_at', 'updated_at', 'role']);

            const user: IUserOmitPassword = camelcaseKeys(response[0]);

            return user;
        } catch (error) {
            throw new DatabaseError('Database Error: User Create', error, {
                data,
            });
        }
    }

    public async update(data: IUserUpdate, id: IUuid): Promise<IUserOmitPassword> {
        const db = this.database;

        try {
            const formatedData = snakecaseKeys(data);
            const response: IUserDb[] = await db
                .table('user')
                .where('id', '=', id)
                .update(formatedData)
                .returning(['id', 'email', 'first_name', 'last_name', 'age', 'created_at', 'updated_at', 'role']);

            const user: IUserOmitPassword = camelcaseKeys(response[0]);

            return user;
        } catch (error) {
            throw new DatabaseError('Database Error: User Update', error, {
                data,
            });
        }
    }

    public async delete(id: IUuid): Promise<IUserOmitPassword> {
        const db = this.database;

        try {
            const response: IUserDb[] = await db
                .table('user')
                .where('id', '=', id)
                .del()
                .returning(['id', 'email', 'first_name', 'last_name', 'age', 'created_at', 'updated_at', 'role']);

            const user: IUserOmitPassword = camelcaseKeys(response[0]);

            return user;
        } catch (error) {
            throw new DatabaseError('User cannot be deleted.', error);
        }
    }
}
