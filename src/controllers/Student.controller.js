const { FilterBuilder } = require("filter-builder-js");
const { Student, Course } = require("../models");
const StudentController = {};

/**
 * @typedef {Object} QueryListStudent
 * @property {string} name
 * @property {number} id
 */

StudentController.list = async (req, res, next) => {
  try {
    const filter = new FilterBuilder(Student, req.query).like("name").equal("id").leftJoin(Course, "courses");

    const data = await filter.run();

    next(data);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = StudentController;
