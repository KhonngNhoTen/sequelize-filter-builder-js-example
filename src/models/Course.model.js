const md5 = require("md5");
const { DataTypes, Model } = require("sequelize");

class Course extends Model {
  static tableName = "course";
  static run(connection, tableName) {
    Course.init(
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: DataTypes.STRING,
        creator: { type: DataTypes.INTEGER, allowNull: true },
      },
      {
        sequelize: connection,
        tableName: tableName ?? Course.tableName,
        createdAt: "createdAt",
        updatedAt: "updatedAt",
        paranoid: true,
      }
    );
    return Course;
  }

  /** @param {Record<string, typeof Model>} param */
  static associate({ Course, User, Student }) {
    Course.belongsTo(User, { as: "user", foreignKey: "creator" });

    Course.belongsToMany(Student, {
      as: "students",
      through: "student_course",
      foreignKey: "idCourse",
    });
  }
}

module.exports = Course;
