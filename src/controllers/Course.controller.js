const { FilterBuilder, Condition } = require("filter-builder-js");
const { Student, Course, Lesson } = require("../models");
const CourseController = {};

/**
 * @typedef {Object} QueryListStudent
 * @property {string} name
 * @property {number} id
 * @property {number} lessonId
 * @property {string} lessonName
 * @property {number} studentId
 * @property {string} studentName
 */

CourseController.list = async (req, res, next) => {
  try {
    const filter = new FilterBuilder(Course, req.query)
      .like("name")
      .equal("id")
      .leftJoin(
        new Condition(Student, "students")
          .equal("studentId", "id")
          .iLike("studentName", "name")
      )
      .innerJoin(
        new Condition(Lesson, "lessons")
          .equal("lessonId", "id")
          .iLike("lessonName", "name")
      );
    const data = await filter.run();
    next(data);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = CourseController;
