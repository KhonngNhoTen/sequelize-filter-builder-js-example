const { FilterBuilder } = require("filter-builder-js");
const User = require("../models/User.model");
const UserController = {};

UserController.list = async (req, res, next) => {
  try {
    const filter = new FilterBuilder(User, req.query)
      .like("name")
      .like("emails", "email")
      .equal("id");
    const data = await filter.run();
    next(data);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = UserController;
