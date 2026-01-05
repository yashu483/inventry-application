#! /usr/bin/env node
const { argv } = require("node:process");
require("dotenv").config();
const db = require("./queries");

const { Client } = require("pg");

const SQL = `CREATE TABLE IF NOT EXISTS genre (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
genre_value VARCHAR(255),
genre_label VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS book (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
name VARCHAR (255),
author VARCHAR (255),
published_date DATE,
description TEXT,
genre_id INTEGER,
FOREIGN KEY (genre_id) REFERENCES genre(id)
);`;

// list of initial genres
const initialGenres = [
  { value: "adventure", label: "Adventure" },
  { value: "thriller", label: "Thriller" },
  { value: "young_adult", label: "Young Adult" },
  { value: "folklore", label: "Folklore" },
  { value: "cyberpunk", label: "Cyberpunk" },
  { value: "sci_fi", label: "Sci-Fi" },
  { value: "fantasy", label: "Fantasy" },
  { value: "historical-fiction", label: "Historical Fiction" },
  { value: "drama", label: "Drama" },
  { value: "psychological-thriller", label: "Psychological Thriller" },
  { value: "steampunk", label: "Steampunk" },
  { value: "social_realism", label: "Social Realism" },
  { value: "autobiography", label: "Autobiography" },
  { value: "biography", label: "Biography" },
  { value: "satire", label: "Satire" },
  { value: "fiction", label: "Fiction" },
  { value: "poem", label: "Poem" },
  { value: "fairy_tale", label: "Fairy Tale" },
  { value: "new_adult", label: "New Adult" },
  { value: "comedy", label: "Comedy" },
  { value: "romance", label: "Romance" },
  { value: "mystery", label: "Mystery" },
  { value: "dystopian_fiction", label: "Dystopian Fiction" },
  { value: "novel", label: "Novel" },
  { value: "utopian_fiction", label: "Utopian Fiction" },
  { value: "action", label: "Action" },
];

const populateGenre = async (arr, client) => {
  const genreCount = await db.getGenreCount();
  // current work here
  if (genreCount !== 0) return;
  try {
    await client.query("BEGIN");
    for (item of arr) {
      await client.query(
        "INSERT INTO genre (genre_value, genre_label) VALUES ($1, $2)",
        [item.value, item.label]
      );
    }
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  }
};
const connectionString =
  argv[2] === "localdb"
    ? process.env.LOCAL_DB_CONNECTION_STRING
    : process.env.PRODUCTION_DB_CONNECTION_STRING;

const main = async () => {
  console.log("seeding...");
  const client = new Client({
    connectionString: connectionString,
  });

  await client.connect();
  await client.query(SQL);
  await populateGenre(initialGenres, client);
  await client.end();
};

main();
