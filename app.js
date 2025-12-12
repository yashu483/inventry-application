const express = require("express");
const indexRouter = require("./routes/indexRouter");
const booksRouter = require("./routes/booksRouter");
const genresRouter = require("./routes/genresRouter");
const path = require("node:path");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/books", booksRouter);
app.use("/genres", genresRouter);
app.use("/", indexRouter);
const PORT = process.env.PORT || 6004;
app.listen(PORT, () => {
  console.log(`App is running on server http://localhost:${PORT}`);
});
