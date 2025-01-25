const { FilterBuilder } = require("filter-builder-js");
const { User } = require("../models");
const UserController = {};

/**
 * @typedef {Object} QueryUser
 * @property {string} name
 * @property {string} emails
 * @property {number} id
 */

UserController.list = async (req, res, next) => {
  try {
    /** @type {QueryUser} */
    const query = req.query;
    const filter = new FilterBuilder(User, query)
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
