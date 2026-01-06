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

module.exports = { homepageController, getAllBooks, getGenre };
