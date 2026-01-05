const { Router } = require("express");

const genresRouter = Router();

genresRouter.get("/", (req, res, next) => {
  res.render("genres");
});

module.exports = genresRouter;
