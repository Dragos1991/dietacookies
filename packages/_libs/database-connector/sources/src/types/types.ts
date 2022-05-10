import type { Knex } from "knex";

export type IDbConfig = { [key: string]: Knex.Config };
