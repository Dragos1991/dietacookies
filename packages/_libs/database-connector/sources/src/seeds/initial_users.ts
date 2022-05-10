import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("user").del();

    // Inserts seed entries
    await knex("user").insert([
        {
            "first-name": "Dragos",
            "last-name": "Nitescu",
            age: 31,
            password: "1234",
            email: "dragos@test.test",
        },
        {
            "first-name": "Diana",
            "last-name": "Nitescu",
            age: 31,
            password: "1234",
            email: "diana@test.test",
        },
    ]);
}
