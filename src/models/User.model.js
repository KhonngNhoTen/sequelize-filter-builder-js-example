const md5 = require("md5");
const { DataTypes, Model } = require("sequelize");

class User extends Model {
  static tableName = "user";
  static run(connection, tableName) {
    User.init(
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        email: DataTypes.STRING,
        name: DataTypes.STRING,
        password: DataTypes.STRING,
      },
      {
        sequelize: connection,
        tableName: tableName ?? User.tableName,
        createdAt: "createdAt",
        updatedAt: "updatedAt",
        paranoid: true,
      }
    );
    return User;
  }

  static associate() {}
}

module.exports = User;
