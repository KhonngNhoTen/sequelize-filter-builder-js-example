const { Sequelize } = require("sequelize");
const env = require("../config/env.config");

const connection = new Sequelize({
  database: env.DB.NAME,
  password: env.DB.PASSWORD,
  username: env.DB.USER,
  port: env.DB.PORT,
  dialect: "postgres",
  pool: 10,
  logging: console.log,
});

async function authenticate() {
  try {
    await connection.authenticate();
    console.log("connect db successfully!!");
  } catch (error) {
    console.log("connect db fail", error);
    throw error;
  }
}

module.exports = {
  connection,
  authenticate,
};
