const { connector } = require("./db-connector");

let sequelize = null;

module.exports.initSequelize = async function (event) {
  console.log("Incoming event middleware", JSON.stringify(event));
  sequelize = await connector(sequelize);

  const TransportOrder = require("./models/TransportOrder")(sequelize);

  console.log("Models imported!");

  return {
    models: {
      TransportOrder,
    },
    sequelize,
  };
};
