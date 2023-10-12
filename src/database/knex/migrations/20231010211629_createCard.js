exports.up = (knex) =>
  knex.schema.createTable("credit_cards", (table) => {
    table.increments("id").primary();
    table.integer("card_number").notNullable();
    table.string("cardholder_name").notNullable();
    table.integer("expiration_date").notNullable();
    table.integer("cvc").notNullable();

    table.integer("user_id").references("id").inTable("users");
  });

exports.down = (knex) => knex.schema.dropTable("credit_cards");
