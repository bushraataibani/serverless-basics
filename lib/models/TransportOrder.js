const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define("TransportOrder", {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    device: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "web",
    },
  });
};
