'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Step extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Step.belongsTo(models.Component);
    }
  }
  Step.init({
    description: DataTypes.TEXT,
    order: DataTypes.INTEGER,
    image: DataTypes.STRING,
    componentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Step',
    timestamps: false,
  });
  return Step;
};