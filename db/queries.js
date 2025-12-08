const pool = require("./pool");

const getAllBooks = async () => {
  const { rows } = await pool.query(`SELECT * FROM books`);
};
