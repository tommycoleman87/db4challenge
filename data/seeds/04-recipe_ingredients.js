
exports.seed = function(knex) {
      // Inserts seed entries
      return knex('recipe_ingredients').insert([
        { recipe_id: 1, ingredient_id: 1, quantity: 10},
        { recipe_id: 2, ingredient_id: 2, quantity: 5},
        { recipe_id: 3, ingredient_id: 3, quantity: 1}
      ]);
};
