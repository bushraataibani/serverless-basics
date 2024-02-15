const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define("TransportOrderStops", {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    stop: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  });
};
