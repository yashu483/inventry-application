const { Router } = require("express");
const controller = require("./../controllers/controller");

const booksRouter = Router();

booksRouter.get("/", controller.getAllBooks);

module.exports = booksRouter;
