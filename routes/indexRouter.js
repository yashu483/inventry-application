const { Router } = require("express");

const indexRouter = Router();

indexRouter.get("/", (req, res, next) => {
  res.render();
});

module.exports = indexRouter;
