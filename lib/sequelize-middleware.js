const { initSequelize } = require("./init-sequelize");

let sequelizeSync = null;

module.exports.middleware = async function (handler, DB_SCHEMA) {
  if (sequelizeSync) {
    console.log("Skipping sequelize sync");
  } else {
    console.log("Initiating sequelize sync");
    sequelizeSync = await initSequelize(handler.event, DB_SCHEMA);
  }
  handler.context.models = sequelizeSync.models;
  handler.context.sequelize = sequelizeSync.sequelize;
  return;
};
