exports.up = (knex) =>
  knex.schema.createTable("dishes", (table) => {
    table.increments("id").primary();
    table.string("image").notNullable();
    table.string("name").notNullable();
    table.string("category").notNullable();
    table.float("price").notNullable();
    table.string("description").notNullable();

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("dishes");
