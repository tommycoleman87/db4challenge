const express = require('express');

const recipeRouter = require('./recipes/recipeRouter');
const ingredientsRoute = require('./ingredients/ingredientsRoute')
const server = express();

server.use(express.json());
server.use('/api/recipes', recipeRouter)
server.use('/api/ingredients', ingredientsRoute)

module.exports = server;