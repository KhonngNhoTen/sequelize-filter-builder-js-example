const getNumber = (key, defaultValue) =>
  process.env[key] ? +process.env[key] : defaultValue;

const getString = (key, defaultValue) =>
  process.env[key] ? process.env[key] : defaultValue;

const getBool = (key, defaultValue) =>
  process.env[key]
    ? process.env[key].toLocaleLowerCase() === "true"
    : defaultValue;

const getJson = (key, defaultValue) =>
  process.env[key] ? JSON.parse(process.env[key]) : defaultValue;

require("dotenv").config();
const env = {
  PORT: getNumber("PORT", 4444),
  DB: {
    HOST: getString("DB_HOST", "localhost"),
    PORT: getNumber("DB_PORT", 5440),
    USER: getString("DB_USER"),
    PASSWORD: getString("DB_PASSWORD"),
    NAME: getString("DB_NAME"),
  },
};

module.exports = env;
