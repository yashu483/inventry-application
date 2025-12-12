const { Router } = require("express");

const booksRouter = Router();

booksRouter.get("/", (req, res, next) => {
  res.send("books found");
});

module.exports = booksRouter;
