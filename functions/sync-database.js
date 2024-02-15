const middy = require("middy");
const { middleware } = require("../lib/sequelize-middleware");

const SYNC_DB = "force";

const handler = middy(async (event, context) => {
  console.log("Incoming event", JSON.stringify(event));
  const { sequelize } = context;

  switch (SYNC_DB) {
    case "force":
      console.log("Running force migration");
      await sequelize.sync({ force: true });
      break;

    case "alter":
      console.log("Running alter migration");
      await sequelize.sync({ alter: true });
      break;

    case "full":
      console.log("Running full migration");
      await sequelize.sync();
      break;

    default:
      console.log("Skipping migration");
      break;
  }

  console.log("All models were synchronized successfully.");
  return;
});

handler.use({
  before: middleware,
});

module.exports = { handler };
