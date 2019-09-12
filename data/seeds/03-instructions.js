exports.seed = function(knex) {
  // Inserts seed entries
  return knex('instructions').insert([
    {id:1, recipe_id: 1, instructions: 'Fill pot with water', step: 1},
    {id: 2, recipe_id: 1, instructions: 'Boil Water', step: 2},
    {id: 3, recipe_id: 1, instructions: 'Place spaghetti noodles in water', step: 3}
  ]);
};
