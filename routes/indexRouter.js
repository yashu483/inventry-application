const { Router } = require("express");
const controller = require("./../controllers/controller");
const indexRouter = Router();

indexRouter.get("/", controller.getBooks);

module.exports = indexRouter;
