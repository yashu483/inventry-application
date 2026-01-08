const { Router } = require("express");
const controller = require("./../controllers/controller");

const booksRouter = Router();

booksRouter.get("/", controller.getAllBooks);
booksRouter.get("/add", controller.createBookGet);
booksRouter.post("/add", controller.createBookPost);
booksRouter.get("/update/:bookid", (req, res) => {
  res.send("hello book get");
});
booksRouter.post("/update/bookid", (req, res) => {
  res.send("hellow update done");
});

module.exports = booksRouter;
