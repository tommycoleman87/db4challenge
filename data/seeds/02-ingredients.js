
exports.seed = function(knex) {
      return knex('ingredients').insert([
        {id: 1, ingredient_name: 'Spaghetti Noodles'},
        {id: 2, ingredient_name: 'Steak'},
        {id: 3, ingredient_name: 'Lasagna Noodles'}
      ]);
  
};
