'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ingredient.belongsTo(models.Component);
    }
  }
  Ingredient.init({
    name: DataTypes.STRING,
    quantity: DataTypes.DECIMAL,
    unit: DataTypes.STRING,
    componentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ingredient',
    timestamps: false,
  });
  return Ingredient;
};