const { body, validationResult, matchedData } = require("express-validator");

const db = require("./../db/queries");

const homepageController = async (req, res) => {
  const books = await db.getAllBooks();
  const genres = await db.getGenreList();
  res.render("index", { books: books, genres: genres });
};

const getAllBooks = async (req, res) => {
  const books = await db.getAllBooks();
  const removeTimeFromPublishedDate = books.map((book) => ({
    ...book,
    published_date: book.published_date
      ? book.published_date.toISOString().split("T")[0]
      : null,
  }));
  res.render("books", { books: removeTimeFromPublishedDate });
};

const getGenre = async (req, res) => {
  const genres = await db.getGenreList();
  res.render("genres", { genres: genres });
};

const alphaErr = "must only contain letters";
const lengthErr = "must not be empty or more 200 characters";
const descriptionErr = "must be between atleast 10 to 1000 characters";

const validateBookData = [
  body("name")
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage(`Book name length ${lengthErr}`),
  body("author")
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage(`Author name ${lengthErr}`),
  body("description").trim(),
  body("published_date").trim().isISO8601().withMessage("Invalid date format"),
  body("genre_value").trim().notEmpty().withMessage("Must Select a genre"),
];
// returns a Form page for creating new book
const createBookGet = async (req, res) => {
  const genres = await db.getGenreList();
  res.render("newbook", { genres: genres, errors: false, prevFormData: false });
};

const createBookPost = [
  validateBookData,
  async (req, res) => {
    const errors = validationResult(req);
    const formData = matchedData(req);

    if (!errors.isEmpty()) {
      const genres = await db.getGenreList();
      return res.status(400).render("newbook", {
        errors: errors.array(),
        genres: genres,
        prevFormData: formData,
      });
    }
    const genreId = await db.getGenreIdFromLabel(formData.genre_value);
    await db.addNewBook({
      name: formData.name,
      author: formData.author,
      publishedDate: formData.published_date,
      description: formData.description,
      genreId: genreId,
    });

    res.redirect("/books");
  },
];
module.exports = {
  homepageController,
  getAllBooks,
  getGenre,
  createBookGet,
  createBookPost,
};
