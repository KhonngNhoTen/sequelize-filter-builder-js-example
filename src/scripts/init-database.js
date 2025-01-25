const { User, Course, Lesson, Student, Student_Course } = require("../models");
const md5 = require("md5");

const { connection } = require("../database/db");
async function initValue() {
  await connection.sync();
  const transaction = await connection.transaction();

  console.log("Initial value.... \nWaiting 7seconds, Ctr+c to cancel");
  await new Promise((r) => setTimeout(r, 7000));
  try {
    const users = await createUser(
      [
        {
          name: "Nguyen Van A",
          email: "123@a.mail.com",
          password: md5("12345a@"),
        },
        {
          name: "Nguyen Van B",
          email: "12345@a.mail.com",
          password: md5("12345a@"),
        },
      ],
      transaction
    );
    const creator = users[0].id;

    const students = await createStudent(
      [
        {
          name: "Nguyen Van A",
          age: 22,
          creator,
        },
        {
          name: "Nguyen Van B",
          age: 23,
          creator,
        },
      ],
      transaction
    );

    const courses = await createCourse(
      [
        { name: "Training in Machine Learning", creator },
        { name: "Fundamentals of Python", creator },
      ],
      transaction
    );

    await createLesson(
      courses.map((val) => ({
        name: `Lesson 1 - ${val.name}`,
        content: `Content ${val.name}`,
        idCourse: val.id,
        creator: creator,
      })),
      transaction
    );

    await createStudentCourse(
      [
        {
          idCourse: courses[0].id,
          idStudent: students[0].id,
        },
        {
          idCourse: courses[0].id,
          idStudent: students[1].id,
        },
        {
          idCourse: courses[1].id,
          idStudent: students[0].id,
        },
      ],
      transaction
    );
    await transaction.commit();
    console.log("Init database successfully!!");
  } catch (error) {
    await transaction.rollback();
    console.error("Init database fail!", error);
  }
  process.exit(1);
}

initValue();

/**
 * @param {Array} userDto
 *@returns {Promise<Array>}
 */
async function createUser(userDtos, transaction) {
  return await Promise.all(
    userDtos.map((userDto) => User.create(userDto, { transaction }))
  );
}

/**
 * @param {Array} studentDtos
 * @returns {Promise<Array>}
 */
async function createStudent(studentDtos, transaction) {
  return await Promise.all(
    studentDtos.map((studentDto) => Student.create(studentDto, { transaction }))
  );
}

/**
 * @param {Array} courseDtos
 * @returns {Promise<Array>}
 */
async function createCourse(courseDtos, transaction) {
  return await Promise.all(
    courseDtos.map((courseDto) => Course.create(courseDto, { transaction }))
  );
}

/**
 * @param {Array} lessonDtos
 * @returns {Promise<Array>}
 */
async function createLesson(lessonDtos, transaction) {
  return await Promise.all(
    lessonDtos.map((lessonDto) => Lesson.create(lessonDto, { transaction }))
  );
}

/**
 * @param {Array} studentCourseDtos
 * @returns {Promise<Array>}
 */
async function createStudentCourse(studentCourseDtos, transaction) {
  return await Promise.all(
    studentCourseDtos.map((studentCourseDto) =>
      Student_Course.create(studentCourseDto, { transaction })
    )
  );
}
