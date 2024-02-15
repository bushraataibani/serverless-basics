const middy = require("middy");

const { middleware } = require("../lib/sequelize-middleware");

const handler = middy(async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log("Incoming event", JSON.stringify(event));

  const { arguments = {} } = event;
  const { models } = context;
  const { TransportOrderStops } = models;

  try {
    await TransportOrderStops.bulkCreate([
      {
        ID: 90,
        stop: "15",
      },
      {
        ID: 46,
        stop: "16",
      },
    ]);

    const { rows } = await TransportOrderStops.findAndCountAll({
      where: {
        ID: event.ID,
      },
    });
    console.log("TransportOrderStops", JSON.stringify(rows));
  } catch (err) {
    console.log("Error at query", JSON.stringify(err));
    throw err;
  }
});

handler.use({
  before: middleware,
});

module.exports = { handler };
