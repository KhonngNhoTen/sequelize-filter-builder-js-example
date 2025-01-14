const md5 = require("md5");
const { FilterBuilderConfig } = require("filter-builder-js");
const { authenticate } = require("./database/db");

async function beforeStartApp(app) {
  await authenticate();

  FilterBuilderConfig.config({
    type: "sequelize",
  });
}

module.exports = beforeStartApp;
