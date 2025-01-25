const router = require("express").Router();
const routes = [
  require("./user.route"),
  require("./student.route"),
  require("./course.route"),
  require("./lesson.route"),
];

routes.forEach((route) => {
  router.use(`/${route.path}`, route.router);
});

module.exports = router;
