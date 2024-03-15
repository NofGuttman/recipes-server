const express = require('express');
const RecipeModel = require('../models').Recipe;
const ComponentModel = require('../models').Component;
const RecipeComponentModel = require('../models').RecipeComponent;
const IngredientModel = require('../models').Ingredient;
const StepModel = require('../models').Step;

const router = express.Router();

router.get('/', (req, res) => {
  RecipeModel.findAll().then((recipes) => {
    res.status(200).json(recipes);
  });
});

router.get('/:id', (req, res) => {
  RecipeModel.findByPk(req.params.id, {
    include: {
      model: ComponentModel,
      as: 'components',
      through: {
        model: RecipeComponentModel,
        attributes: ["order"],
      },
      include: [
        {
          model: IngredientModel,
          as: 'ingredients'
        },
        {
          model: StepModel,
          as: 'steps'
        }
      ]
    }
  }).then((recipe) => {
    recipe.components.sort((a, b) => (a.RecipeComponent.order || 0) - (b.RecipeComponent.order || 0));
    console.log(recipe);
    if (recipe) {
      res.status(200).json(recipe);
    } else {
      res.status(404).json({
        status: 0,
        message: 'No recipe found',
      });
    }
  })
})

module.exports = router;