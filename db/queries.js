const pool = require("./pool");

const getAllBooks = async () => {
  const { rows } = await pool.query(`SELECT * FROM books`);
  return rows;
};

const getAllBooksFromGenre = async (genre) => {
  const { rows } = await pool.query("SELECT * FROM books WHERE genre = $1", [
    genre,
  ]);
  return rows;
};

const getBookDetailById = async (id) => {
  const { rows } = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
  return rows;
};

const addNewBook = async (book) => {
  await pool.query(
    "INSERT INTO books (book_name, author, published_date, genre, description) VALUES($1, $2,$3,$4,$5)",
    [book.name, book.author, book.publishedDate, book.genre, book.description]
  );
};

const updateBook = async (book) => {
  await pool.query(
    "UPDATE books SET book_name = $1, author = $2, published_date = $3, genre = $4, description = $5  WHERE id = $6",
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

module.exports = {
  getAllBooks,
  getAllBooksFromGenre,
  getBookDetailById,
  addNewBook,
};
