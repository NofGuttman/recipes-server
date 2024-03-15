'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RecipeComponent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RecipeComponent.init({
    componentId: DataTypes.INTEGER,
    recipeId: DataTypes.INTEGER,
    order: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'RecipeComponent',
    timestamps: false,
  });
  return RecipeComponent;
};