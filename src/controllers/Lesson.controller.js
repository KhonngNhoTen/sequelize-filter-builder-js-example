const { FilterBuilder, Condition } = require("filter-builder-js");
const { Student, Course, Lesson } = require("../models");
const LessonController = {};

/**
 * @typedef {Object} QueryListStudent
 * @property {string} name
 * @property {number} id
 * @property {number} courseId
 * @property {string} courseName
 * @property {number} studentId
 * @property {string} studentName
 */

LessonController.list = async (req, res, next) => {
  try {
    const filter = new FilterBuilder(Lesson, req.query)
      .like("name")
      .equal("id")
      .innerJoin(new Condition(Course, "courses").iLike("courseName", "name"))
      .leftJoin(new Condition(Student, "courses.students"))
      .and([
        new Condition("courses.students").equal("studentId", "id"),
        new Condition("courses").equal("courseId", "id"),
      ]);
    const data = await filter.run();
    next(data);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = LessonController;
