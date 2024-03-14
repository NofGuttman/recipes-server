'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Recipe.belongsToMany(models.Component, {through: 'RecipeComponent', as: 'components'})
    }
  }
  Recipe.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    prepTime: DataTypes.STRING,
    cookTime: DataTypes.STRING,
    totalTime: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Recipe',
    timestamps: false,
  });
  return Recipe;
};