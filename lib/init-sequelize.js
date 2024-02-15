const { connector } = require("./db-connector");

let sequelize = null;

module.exports.initSequelize = async function (event) {
  console.log("Incoming event middleware", JSON.stringify(event));
  sequelize = await connector(sequelize);

  const TransportOrder = require("./models/TransportOrder")(sequelize);
  const TransportOrderStops = require("./models/TransportOrderStops")(
    sequelize
  );

  // Define association
  TransportOrder.hasMany(TransportOrderStops, {
    foreignKey: "ID",
  });
  TransportOrderStops.belongsTo(TransportOrder, {
    foreignKey: "ID",
  });

  console.log("Models imported!");

  return {
    models: {
      TransportOrder,
      TransportOrderStops,
    },
    sequelize,
  };
};
