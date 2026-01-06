const pool = require("./pool");

// queries for book table
const getAllBooks = async () => {
  const { rows } = await pool.query(`SELECT * FROM book`);
  return rows;
};

const getAllBooksFromGenre = async (genreId) => {
  const { rows } = await pool.query("SELECT * FROM book WHERE genre_id = $1", [
    genreId,
  ]);
  return rows;
};

const getBookDetailById = async (id) => {
  const { rows } = await pool.query("SELECT * FROM book WHERE id = $1", [id]);
  return rows;
};

const getAllBookCount = async () => {
  const { rows } = await pool.query("SELECT COUNT(*) FROM book;");
  const bookCount = Number(rows[0].count);
  return bookCount;
};

const addNewBook = async (book) => {
  await pool.query(
    "INSERT INTO book (name, author, published_date,description,genre_id) VALUES($1, $2,$3,$4,$5)",
    [book.name, book.author, book.publishedDate, book.description, book.genreId]
  );
};

const updateBook = async (book) => {
  await pool.query(
    "UPDATE book SET book_name = $1, author = $2, published_date = $3, genre = $4, description = $5  WHERE id = $6",
    [
      book.name,
      book.author,
      book.publishedDate,
      book.genre,
      book.description,
      book.id,
    ]
  );
};

// queries for genre table
const getGenreList = async () => {
  const { rows } = await pool.query(
    "SELECT * FROM genre ORDER BY genre.genre_label"
  );
  return rows;
};
const getGenreValueAndId = async () => {
  const { rows } = await pool.query(
    "SELECT genre.genre_value, genre.id FROM genre"
  );
  return rows;
};
const getGenreCount = async () => {
  const { rows } = await pool.query("SELECT COUNT(*) FROM genre;");
  const count = Number(rows[0].count);
  return count;
};
module.exports = {
  getAllBooks,
  getAllBooksFromGenre,
  getBookDetailById,
  getAllBookCount,
  addNewBook,
  updateBook,
  getGenreList,
  getGenreValueAndId,
  getGenreCount,
};
