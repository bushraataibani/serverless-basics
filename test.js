async function test() {
  const { connector } = require("./lib/db-connector");
  const sequelize = await connector();
  const TransportOrder = require("./lib/models/TransportOrder")(sequelize);

  // Create (Insert)
  const newTransportOrder = await TransportOrder.create({
    ID: "6",
    device: "tablet",
  });

  // Bulk Create (Insert)
  const bulkRows = await TransportOrder.bulkCreate([
    {
      ID: "7",
      device: "laptop",
    },
    {
      ID: "8",
      device: "smartphone",
    },
  ]);

  // Read (Select)
  const transportOrderById = await TransportOrder.findByPk(6); // Example: Read by Primary Key
  const allTransportOrders = await TransportOrder.findAll(); // Example: Read all records

  // Update
  await TransportOrder.update({ device: "smartwatch" }, { where: { ID: "6" } });

  // Delete
  await TransportOrder.destroy({ where: { ID: "8" } });

  console.log("New Transport Order:", newTransportOrder);
  console.log("Bulk Rows:", bulkRows);
  console.log("Transport Order by ID:", transportOrderById);
  console.log("All Transport Orders:", allTransportOrders);
}
test();
