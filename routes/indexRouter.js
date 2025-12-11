const { Router } = require("express");
const controller = require("./../controllers/controller");
const indexRouter = Router();

indexRouter.get("/", controller.homepageController);

module.exports = indexRouter;
