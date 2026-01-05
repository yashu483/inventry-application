const pool = require("./pool");

const getAllBooks = async () => {
  const { rows } = await pool.query(`SELECT * FROM book`);
  return rows;
};

const getAllBooksFromGenre = async (genre) => {
  const { rows } = await pool.query("SELECT * FROM book WHERE genre = $1", [
    genre,
  ]);
  return rows;
};

const getBookDetailById = async (id) => {
  const { rows } = await pool.query("SELECT * FROM book WHERE id = $1", [id]);
  return rows;
};

const addNewBook = async (book) => {
  await pool.query(
    "INSERT INTO book (book_name, author, published_date, genre, description) VALUES($1, $2,$3,$4,$5)",
    [book.name, book.author, book.publishedDate, book.genre, book.description]
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

// creating separate table to store genre list as there might be genre which do not have any book thus not being able to get using raw books able
const getGenreList = async () => {
  const { rows } = await pool.query("SELECT * FROM genre");
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
  addNewBook,
  updateBook,
  getGenreList,
  getGenreCount,
};
