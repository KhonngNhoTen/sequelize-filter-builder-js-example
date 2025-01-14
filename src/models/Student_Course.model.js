const md5 = require("md5");
const { DataTypes, Model, UUIDV4 } = require("sequelize");

class Student_Course extends Model {
  static tableName = "student_course";
  static run(connection, tableName) {
    Student_Course.init(
      {
        idCourse: { type: DataTypes.STRING, primaryKey: true },
        idStudent: { type: DataTypes.STRING, primaryKey: true },
      },
      {
        sequelize: connection,
        tableName: tableName ?? Student_Course.tableName,
        createdAt: "createdAt",
        updatedAt: "updatedAt",
      }
    );
    return Student_Course;
  }
}

module.exports = Student_Course;
