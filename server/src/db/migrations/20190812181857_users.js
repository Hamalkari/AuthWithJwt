exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('email', 255).unique();
    table.string('phone_number', 255).unique();
    table.string('password', 255).notNullable();
    table.string('first_name', 255).notNullable();
    table.string('second_name', 255).notNullable();
    table.string('refresh_token', 255).notNullable().defaultTo('');
    table.integer('created_at').defaultTo(knex.raw('extract(epoch from now())'));
    table.integer('updated_at').defaultTo(knex.raw('extract(epoch from now())'));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
