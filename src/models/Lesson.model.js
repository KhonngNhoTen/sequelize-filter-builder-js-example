const md5 = require("md5");
const { DataTypes, Model } = require("sequelize");

class Lesson extends Model {
  static tableName = "lesson";
  static run(connection, tableName) {
    Lesson.init(
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: DataTypes.STRING,
        content: DataTypes.STRING,
        idCourse: DataTypes.INTEGER,
        creator: { type: DataTypes.INTEGER, allowNull: true },
      },
      {
        sequelize: connection,
        tableName: tableName ?? Lesson.tableName,
        createdAt: "createdAt",
        updatedAt: "updatedAt",
        paranoid: true,
      }
    );
    return Lesson;
  }

  /** @param {Record<string, typeof Model>} param */
  static associate({ Lesson, User, Course }) {
    Lesson.belongsTo(User, { as: "user", foreignKey: "creator" });
    Lesson.belongsTo(Course, { as: "courses", foreignKey: "idCourse" });
  }
}

module.exports = Lesson;
