const CourseController = require("../controllers/Course.controller");

const router = require("express").Router();

router.get("", CourseController.list);

module.exports = {
  path: "courses",
  router,
};
