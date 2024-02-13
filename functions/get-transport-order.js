const middy = require("middy");

const { middleware } = require("../lib/sequelize-middleware");

const handler = middy(async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log("Incoming event", JSON.stringify(event));

  const { arguments = {} } = event;
  const { models } = context;
  const { TransportOrder } = models;

  try {
    const { rows } = await TransportOrder.findAndCountAll({
      where: {
        ID: event.ID,
      },
      // include: {
      //   model:,
      // }
    });
    console.log("TransportOrder", JSON.stringify(rows));
  } catch (err) {
    console.log("Error at query", JSON.stringify(err));
    throw err;
  }
});

handler.use({
  before: middleware,
});

module.exports = { handler };
