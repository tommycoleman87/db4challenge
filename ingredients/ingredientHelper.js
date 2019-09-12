const db = require('../data/db-config');

module.exports = {
    getRecipesForIngredient,
    getIngredients
}
function getRecipesForIngredient(id) {
    return db('ingredients as i')
    .join('recipe_ingredients as ri', 'i.id', 'ri.ingredient_id')
    .where({ingredient_id: id})
    .join('recipes as r', 'r.id', 'ri.recipe_id')
    .select('r.recipe_name')
}

function getIngredients() {
    return db('ingredients')
}