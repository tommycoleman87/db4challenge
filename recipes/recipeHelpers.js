const db = require('../data/db-config');

module.exports = {
    getRecipes,
    findById,
    remove,
    add,
    getShoppingList,
    update,
    addIngredient,
    getInstructions
}
function getRecipes() {
   return db('recipes')
   .then(recipes => {
       return recipes;
   })

}

function findById(id) {
    return db('recipes').where({id: id}).first()
    .then(recipe => {
         if(recipe) {
             return recipe;
         } else {
             return null;
         };
    })
}


function remove(id) {
    const deletedRecipe= findById(id);
    return db('recipes').where({id: id}).del().then(del => {
        if(deletedRecipe) {
            return deletedRecipe;
        } else {
            return null;
        };
    });
}

function add(recipe) {
    return db('recipes').insert(recipe).then(ids => {
        return findById(ids[0])
    })
}
function update(changes, id) {
    return db('recipes').update(changes).where({id: id})
    .then(result => {
        return findById(id);
    })
}
function getShoppingList(id) {
    return db('recipes as r')
    .join('recipe_ingredients as ri', 'r.id', 'ri.recipe_id')
    .where({recipe_id: id})
    .join('ingredients as i', 'i.id', 'ri.ingredient_id')
    .select('r.recipe_name', 'ri.quantity', 'i.ingredient_name')
    
    
}
function getInstructions(id) {
    return db('recipes as r')
    .join('instructions as i', 'r.id', 'i.recipe_id')
    .where({recipe_id: id})
    .select('r.recipe_name', 'i.step', 'i.instructions')
    .orderBy('i.step')
    
    
}

function addIngredient(ingredient, id) {
    return db('ingredients').insert(ingredient)
    .then(result => {
        return findSteps(id);
    })
}