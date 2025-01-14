const bodyParser = require("body-parser");
const express = require("express");
const beforeStartApp = require("./before-start-app");
const app = express();

const route = require("./routes");
const env = require("./config/env.config");
// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(route);

app.use(function (data, req, res, next) {
  if (data instanceof Error)
    return res.status(data?.status ?? 500).json({ message: data.message });
  return res.status(data?.status ?? 200).json(data);
});
app.listen(env.PORT, async () => {
  await beforeStartApp(app);
  console.log("SERVER RUN AT: " + env.PORT);
});
