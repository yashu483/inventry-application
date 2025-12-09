const db = require("./../db/queries");

const getBooks = async (req, res) => {
  const rows = await db.getAllBooks();
  res.render("index", { rows: rows });
};

module.exports = { getBooks };
