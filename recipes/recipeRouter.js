const express = require('express');
const Recipes = require('./recipeHelpers');
const router = express.Router();

router.get('/', (req, res) => {
    Recipes.getRecipes()
    .then(recipes => {
      res.json(recipes);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get Recipes' });
    });
  });
  
  router.get('/:id', (req, res) => {
    const { id } = req.params;
  
    Recipes.findById(id)
    .then(recipe => {
      if (recipe) {
        res.json(recipe);
      } else {
        res.status(404).json({ message: 'Could not find recipe with given id.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get Recipes' });
    });
  });
  
  router.get('/:id/shoppinglist', (req, res) => {
    const { id } = req.params;
  
    Recipes.getShoppingList(id)
    .then(ingredients => {
      if (ingredients.length) {
        res.json(ingredients);
      } else {
        res.status(404).json({ message: 'Could not find ingredients for given recipe' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get ingredients' });
    });
  });

  router.get('/:id/instructions', (req, res) => {
    const { id } = req.params;
  
    Recipes.getInstructions(id)
    .then(instructions => {
      if (instructions.length) {
        res.json(instructions);
      } else {
        res.status(404).json({ message: 'Could not find instructions for given recipe' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get instructions' });
    });
  });
  
  router.post('/', (req, res) => {
    const recipeData = req.body;
  
    Recipes.add(recipeData)
    .then(recipe => {
      res.status(201).json(recipe);
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to create new scheme' });
    });
  });
  
  router.post('/:id/ingredients', (req, res) => {
    const ingredientData = req.body;
    const { id } = req.params; 
  
    Recipes.findById(id)
    .then(recipe => {
      if (recipe) {
        Recipes.addIngredient(ingredientData, id)
        .then(ingredient => {
          res.status(201).json(ingredient);
        })
      } else {
        res.status(404).json({ message: 'Could not find scheme with given id.' })
      }
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to create new step' });
    });
  });
  
  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    Recipes.findById(id)
    .then(recipe => {
      if (recipe) {
        Recipes.update(changes, id)
        .then(updatedRecipe => {
          res.json(updatedRecipe);
        });
      } else {
        res.status(404).json({ message: 'Could not find recipe with given id' });
      }
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to update recipe' });
    });
  });
  
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    Recipes.remove(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: 'Could not find recipe with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete recipe' });
    });
  });
  
  module.exports = router;