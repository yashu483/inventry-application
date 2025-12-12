const { Router } = require("express");

const genresRouter = Router();

genresRouter.get("/", (req, res, next) => {
  res.send("genres:: done");
});

module.exports = genresRouter;
