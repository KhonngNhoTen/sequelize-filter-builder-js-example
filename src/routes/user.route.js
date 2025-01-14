const UserController = require("../controllers/User.controller");

const router = require("express").Router();

router.get("", UserController.list);

module.exports = {
  path: "users",
  router,
};
