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

router.post('/create-recipe', async (req, res) => {
  try {
    // Extract recipe data from the request body
    const {components} = req.body;

    // Create the recipe
    const newRecipe = await RecipeModel.create({
      title: req.body.title,
      description: req.body.description,
      prepTime: req.body.prepTime,
      cookTime: req.body.cookTime,
      totalTime: req.body.totalTime,
      image: req.body.image,
    });

    // Array to hold promises for creating components
    const componentPromises = [];

    // Loop through each component in the request
    for (const [componentIndex, componentData] of components.entries()) {
      // Create the component
      const newComponent = await ComponentModel.create({name: componentData.name});

      // Array to hold promises for creating ingredients
      const ingredientPromises = [];

      // Loop through each ingredient in the current component data
      for (const ingredient of componentData.ingredients) {
        // Create the ingredient and associate it with the component
        ingredientPromises.push(
          newComponent.createIngredient({
            name: ingredient.name,
            quantity: ingredient.quantity,
            unit: ingredient.unit,
          })
        );
      }

      // Array to hold promises for creating steps
      const stepPromises = [];

      // Loop through each step in the current component data
      for (const [index, step] of componentData.steps.entries()) {
        // Create the step and associate it with the component
        stepPromises.push(
          newComponent.createStep({
            description: step.description,
            order: index + 1,
          })
        );
      }

      // Wait for all ingredient and step creation promises to resolve
      await Promise.all([...ingredientPromises, ...stepPromises]);

      // Associate the component with the recipe
      await newRecipe.addComponent(newComponent, { through: { order: componentIndex + 1 }});

      // Push the promise for creating the component to the array
      componentPromises.push(newComponent);
    }

    // Wait for all component creation promises to resolve
    await Promise.all(componentPromises);

    res.status(200);
  } catch (err) {
    res.status(500)
  }
})
module.exports = router;