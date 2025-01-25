const LessonController = require("../controllers/Lesson.controller");

const router = require("express").Router();

router.get("", LessonController.list);

module.exports = {
  path: "lessons",
  router,
};
