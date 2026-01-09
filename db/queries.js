const pool = require("./pool");

// queries for book table
const getAllBooks = async () => {
  const { rows } =
    await pool.query(`SELECT book.id, book.name, book.author, book.published_date,book.description, genre.genre_label AS genre_name FROM book
    JOIN genre ON (book.genre_id=genre.id) ORDER BY genre_name`);
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
  return rows[0];
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
    "UPDATE book SET name = $1, author = $2, published_date = $3, description = $4, genre_id = $5  WHERE id = $6",
    [
      book.name,
      book.author,
      book.published_date,
      book.description,
      book.genre_id,
      book.id,
    ]
  );
};

// utility functions
const getsSQLParametersForGenre = async (num) => {
  let arr = [];
  for (let i = 1; i <= num; i++) {
    arr.push(`$${i}`);
  }
  const sqlParameter = arr.join(", ");

  return sqlParameter;
};
// following function takes in a number that tells ORDER by value parameter position in query
const getOrderByClauseNumber = async (pos) => {
  return `$${pos}`;
};

const getBooksByGenre = async (filterGenres, sortBy) => {
  if (filterGenres) {
    if (typeof filterGenres === "object") {
      const genreParameters = await getsSQLParametersForGenre(
        filterGenres.length
      );
      const orderByClause = await getOrderByClauseNumber(
        filterGenres.length + 1
      );
      await filterGenres.push(sortBy);
      const completeSQL = `SELECT book.name, book.author, book.published_date, book.description, genre.genre_label AS genre_name  FROM book JOIN genre ON (book.genre_id = genre.id) WHERE book.genre_id IN ( ${genreParameters} ) ORDER BY ${orderByClause};`;
      const { rows } = await pool.query(completeSQL, filterGenres);
      return rows;
    } else {
      const arr = [filterGenres, sortBy];
      const completeSQL = `SELECT book.name, book.author, book.published_date, book.description, genre.genre_label AS genre_name FROM book JOIN genre ON (book.genre_id=genre.id) WHERE genre_id = $1 ORDER BY $2`;
      const { rows } = await pool.query(completeSQL, arr);
      return rows;
    }
  }
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
const getGenreIdFromLabel = async (genreValue) => {
  const { rows } = await pool.query(
    "SELECT id FROM genre WHERE genre_value = $1",
    [genreValue]
  );
  const genreId = Number(rows[0].id);
  return genreId;
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
  getGenreIdFromLabel,
  getBooksByGenre,
};
