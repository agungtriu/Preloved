"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      item.belongsTo(models.account);
    }
  }
  item.init(
    {
      image: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "image can not be empty.",
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "name can not be empty.",
          },
        },
      },
      purchasePrice: DataTypes.INTEGER,
      sellingPrice: DataTypes.INTEGER,
      stock: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: "stock can not be empty.",
          },
        },
      },
      accountId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: "account id can not be empty.",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "item",
    }
  );
  return item;
};
