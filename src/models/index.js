const { connection } = require("../database/db");

const Course = require("./Course.model");
const Lesson = require("./Lesson.model");
const Student = require("./Student.model");
const Student_Course = require("./Student_Course.model");
const User = require("./User.model");

let models = { User, Student, Lesson, Student_Course, Course };
const modelNames = Object.keys(models);

for (let i = 0; i < modelNames.length; i++) {
  const name = modelNames[i];
  models[name] = models[name].run(connection);
}

for (let i = 0; i < modelNames.length; i++) {
  const name = modelNames[i];
  if (models[name].associate) models[name].associate(models);
}

module.exports = models;
