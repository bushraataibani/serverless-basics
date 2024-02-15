async function test() {
  const { connector } = require("./lib/db-connector");
  const sequelize = await connector();
  const TransportOrder = require("./lib/models/TransportOrder")(sequelize);
  const TransportOrderStops = require("./lib/models/TransportOrderStops")(
    sequelize
  );

  // Create (Insert)
  const newTransportOrder = await TransportOrder.create({
    ID: 86,
    device: "tablet",
  });

  const newTransportOrderStops = await TransportOrderStops.bulkCreate([
    {
      ID: Math.random(),
      stop: "15",
    },
    {
      ID: Math.random(),
      stop: "16",
    },
  ]);

  // Bulk Create (Insert)
  const bulkRows = await TransportOrder.bulkCreate([
    {
      ID: Math.random(),
      device: "laptop",
    },
    {
      ID: Math.random(),
      device: "smartphone",
    },
  ]);

  // Read (Select)
  const transportOrderById = await TransportOrder.findByPk(6); // Example: Read by Primary Key
  const allTransportOrders = await TransportOrder.findAll(); // Example: Read all records

  // Update
  await TransportOrder.update({ device: "smartwatch" }, { where: { ID: "6" } });

  // Delete
  await TransportOrder.destroy({ where: { ID: "15" } });

  console.log("New Transport Order:", newTransportOrder);
  console.log("Bulk Rows:", bulkRows);
  console.log("Transport Order by ID:", transportOrderById);
  console.log("All Transport Orders:", allTransportOrders);
  console.log("Bulk newTransportOrderStops:", newTransportOrderStops);
}
test();
