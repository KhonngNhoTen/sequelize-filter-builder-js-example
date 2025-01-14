const router = require("express").Router();
const routes = [require("./user.route")];

routes.forEach((route) => {
  router.use(`/${route.path}`, route.router);
});

module.exports = router;
