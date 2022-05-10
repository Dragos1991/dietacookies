import knex from "knex";
import config from "./knexfile";

// TODO in prod, use dependency injection
// to create knex intansce so db access can be mocked for tests

// TODO in prod dont't config.development directly
// but decide with env vars which config to use
const database = knex(config.development);

export { database };
