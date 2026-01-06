const { Router } = require("express");
const controller = require("./../controllers/controller");

const genresRouter = Router();

genresRouter.get("/", controller.getGenre);

module.exports = genresRouter;
