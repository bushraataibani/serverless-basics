const { Sequelize } = require("sequelize");

const DB_URL = "sql6.freemysqlhosting.net";
const DB_USERNAME = "sql6683607";
const DB_PASSWORD = "HivmEyhVHC";
const DB_NAME = "sql6683607";
const DIALECT = "mysql";

module.exports.connector = async function (sequelize) {
  console.log(
    "DB_URL",
    JSON.stringify({ DB_URL, DB_USERNAME, DB_PASSWORD, DB_NAME, DIALECT })
  );
  return new Promise((resolve) => {
    if (sequelize) {
      console.log("Existing connection found!");
      resolve(sequelize);
    } else {
      console.log("Creating new connection!");
      sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
        host: DB_URL,
        dialect: DIALECT,
      });
      resolve(sequelize);
    }
  });
};
