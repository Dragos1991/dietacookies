import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("user", (table) => {
        table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()"));
        table.string("first_name").notNullable();
        table.string("last_name").notNullable();
        table.string("email").unique().notNullable();
        table.integer("age");
        table.string("password").notNullable();
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("user");
}
