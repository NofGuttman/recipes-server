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
    quantity: {
      type: DataTypes.DECIMAL(5, 2),
      get() {
        const value = this.getDataValue('quantity');
        if (value !== null && value !== undefined) {
          if (Number.isInteger(value)) {
            return value.toString();
          } else {
            return parseFloat(value).toFixed(2).replace(/\.?0+$/, '');
          }
        }
        return value;
      }
    },
    unit: DataTypes.STRING,
    componentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ingredient',
    timestamps: false,
  });
  return Ingredient;
};