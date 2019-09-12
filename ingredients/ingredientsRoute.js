const Ingredients = require('./ingredientHelper');

const express = require('express');

const router = express.Router();




router.get('/', (req, res) => {
    Ingredients.getIngredients()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.get('/:id/recipes', (req, res) => {
    const { id } = req.params
    console.log(id)
    Ingredients.getRecipesForIngredient(id).then(result => {
        res.status(200).json(result)
    }
    ).catch(err => {
        res.status(500).json(err)
    })

})
module.exports = router;