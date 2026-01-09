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

const genrePageGet = async (req, res) => {
  const filteredGenres = req.query.genre;
  const sortBy = req.query.sort;
  const genres = await db.getGenreList();
  if (filteredGenres) {
    const books = await db.getBooksByGenre(filteredGenres, sortBy);
    res.render("genres", { genres: genres, books: books });
    return;
  }
  res.render("genres", { genres: genres, books: [] });
};

const lengthErr = "must not be empty or more 200 characters";

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
  body("genre_id").trim().notEmpty().withMessage("Must Select a genre"),
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

    await db.addNewBook({
      name: formData.name,
      author: formData.author,
      publishedDate: formData.published_date,
      description: formData.description,
      genreId: Number(formData.genre_id),
    });

    res.redirect("/books");
  },
];

const updateBookGet = async (req, res) => {
  const params = req.params;
  const genres = await db.getGenreList();
  const bookData = await db.getBookDetailById(params.bookid);

  const formattedDate = bookData.published_date
    ? bookData.published_date.toISOString().split("T")[0]
    : "";
  // res.send(`${formattedDate} && ${bookData.genre_id} && ${genres[0].id}`);
  res.render("update-book", {
    genres: genres,
    bookData: { ...bookData, published_date: formattedDate },
    errors: false,
  });
};

const updateBookPost = [
  validateBookData,
  async (req, res) => {
    const errors = validationResult(req);
    const bookData = matchedData(req);
    if (!errors.isEmpty()) {
      const genres = await db.getGenreList();
      res.status(400).render("update-book", {
        errors: errors.array(),
        bookData: bookData,
        genres: genres,
      });
      return;
    }
    const params = req.params;
    const genreId = Number(bookData.genre_id);
    const bookId = Number(params.bookid);
    // res.send(`${genreId} && ${bookId}`);
    await db.updateBook({
      name: bookData.name,
      author: bookData.author,
      published_date: bookData.published_date,
      description: bookData.description,
      genre_id: genreId,
      id: bookId,
    });
    res.redirect("/books");
  },
];
module.exports = {
  homepageController,
  getAllBooks,
  genrePageGet,
  createBookGet,
  createBookPost,
  updateBookGet,
  updateBookPost,
};
