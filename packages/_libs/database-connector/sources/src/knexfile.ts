import dotenv from "dotenv";
import { IDbConfig } from "./types/types";

dotenv.config({
    path: __dirname + "/./../../../../../.env",
});

const config: IDbConfig = {
    development: {
        client: process.env.CLIENT,
        connection: {
            database: process.env.DATABASE,
            user: process.env.USER,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
};

export default config;
