
exports.up = function(knex) {
  return knex.schema
    .createTable('recipes', tbl => {
        tbl.increments();
        tbl.string('recipe_name', 128).notNullable();
    })
    .createTable('ingredients', tbl => {
        tbl.increments();
        tbl.string('ingredient_name', 128).notNullable().unique();
    })
    .createTable('instructions', tbl => {
        tbl.increments();
        tbl.integer('recipe_id').unsigned().references('id').inTable('recipes').onUpdate('CASCADE').onDelete('CASCADE').notNullable();
        tbl.text('instructions').notNullable()
        tbl.integer('step').notNullable().unique();
    })
    .createTable('recipe_ingredients', tbl => {
        tbl.float('quantity').notNullable();
        tbl.integer('recipe_id').unsigned().notNullable().references('id').inTable('recipes').onUpdate('CASCADE').onDelete('CASCADE');
        tbl.integer('ingredient_id').unsigned().notNullable().references('id').inTable('ingredients').onUpdate('CASCADE').onDelete('CASCADE');
        tbl.primary(['recipe_id', 'ingredient_id']);
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('recipe_ingredients')
    .dropTableIfExists('instructions')
    .dropTableIfExists('ingredients')
    .dropTableIfExists('recipes');
};
