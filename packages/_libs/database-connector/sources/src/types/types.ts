import type { Knex } from "knex";

type IDbConfig = { [key: string]: Knex.Config };

type IDatabase = Knex<any, unknown[]>;

export { IDbConfig, Knex, IDatabase };
