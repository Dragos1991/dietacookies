import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('user').del();

    // Inserts seed entries
    await knex('user').insert([
        {
            first_name: 'Dragos',
            last_name: 'Nitescu',
            age: 31,
            password: '1234',
            email: 'dragos@test.test',
            role: 'admin',
        },
        {
            first_name: 'Diana',
            last_name: 'Nitescu',
            age: 31,
            password: '1234',
            email: 'diana@test.test',
        },
    ]);
}
