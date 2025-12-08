const { Pool } = require("db");

module.exports = new Pool({
  host: "localhost",
  user: "yashu",
  password: "yashu",
  database: "inventory_application",
  port: 5432,
});
