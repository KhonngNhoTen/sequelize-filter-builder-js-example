const StudentController = require("../controllers/Student.controller");

const router = require("express").Router();

router.get("", StudentController.list);

module.exports = {
  path: "students",
  router,
};
