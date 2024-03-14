const express = require('express');
const RecipeModel = require('../models').Recipe;
const ComponentModel = require('../models').Component;
const RecipeComponentModel = require('../models').RecipeComponent;

const router = express.Router();

router.get('/by-recipe-id/:recipeId', (req, res) => {
  const recipeId = req.params.recipeId;
  RecipeModel.findByPk(recipeId, {
    include: {
      model: ComponentModel,
      through: {
        model: RecipeComponentModel,
      },
    },
  }).then((components) => {
    if (components) {
      res.status(200).json({
        status: 1,
        data: components.Components
      });
    } else {
      res.status(404).json({
        status: 0,
        message: 'No recipe found',
      });
    }
  })
})

module.exports = router;