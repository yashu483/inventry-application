const { Router } = require("express");
const controller = require("./../controllers/controller");

const booksRouter = Router();

booksRouter.get("/", controller.getAllBooks);
booksRouter.get("/add", controller.createBookGet);

module.exports = booksRouter;
