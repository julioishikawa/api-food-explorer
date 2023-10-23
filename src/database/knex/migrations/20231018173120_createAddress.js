exports.up = (knex) =>
  knex.schema.createTable("address", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("neighborhood").notNullable();
    table.string("street").notNullable();
    table.integer("number").notNullable();
    table.string("complement");

    table.integer("user_id").references("id").inTable("users");
  });

exports.down = (knex) => knex.schema.dropTable("address");
