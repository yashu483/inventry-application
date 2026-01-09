const { Router } = require("express");
const controller = require("./../controllers/controller");

const booksRouter = Router();

booksRouter.get("/", controller.getAllBooks);
booksRouter.get("/add", controller.createBookGet);
booksRouter.post("/add", controller.createBookPost);
booksRouter.get("/update/:bookid", controller.updateBookGet);
booksRouter.post("/update/:bookid", controller.updateBookPost);

module.exports = booksRouter;
