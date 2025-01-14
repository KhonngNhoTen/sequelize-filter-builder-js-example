const md5 = require("md5");
const { DataTypes, Model } = require("sequelize");

class Student extends Model {
  static tableName = "student";
  static run(connection, tableName) {
    Student.init(
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: DataTypes.STRING,
        age: DataTypes.INTEGER,
        creator: { type: DataTypes.INTEGER, allowNull: true },
      },
      {
        sequelize: connection,
        tableName: tableName ?? Student.tableName,
        createdAt: "createdAt",
        updatedAt: "updatedAt",
        paranoid: true,
      }
    );
    return Student;
  }

  /** @param {Record<string, typeof Model>} param */
  static associate({ Student, User, Course }) {
    Student.belongsTo(User, { as: "user", foreignKey: "creator" });

    Student.belongsToMany(Course, {
      as: "courses",
      through: "student_course",
      foreignKey: "idStudent",
    });
  }
}

module.exports = Student;
