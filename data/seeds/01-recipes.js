
exports.seed = function(knex) {
      return knex('recipes').insert([
        {id: 1, recipe_name: 'spaghetti'},
        {id: 2, recipe_name: 'lasagna'},
        {id: 3, recipe_name: 'steak'}
      ]);
};
