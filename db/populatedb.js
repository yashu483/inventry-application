#! /usr/bin/env node
require("dotenv").config();

const { argv } = require("node:process");
const db = require("./queries");
const { Client } = require("pg");
const { count } = require("node:console");

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
  { value: "historical_fiction", label: "Historical Fiction" },
  { value: "drama", label: "Drama" },
  { value: "psychological_thriller", label: "Psychological Thriller" },
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
// list of initial books
const books = [
  {
    name: "Treasure Island",
    author: "Robert Louis Stevenson",
    published_date: "1883-01-01",
    description:
      "A classic adventure story about pirates, treasure, and the sea.",
    genre_value: "adventure",
  },
  {
    name: "The Da Vinci Code",
    author: "Dan Brown",
    published_date: "2003-03-18",
    description:
      "A fast-paced thriller involving secret societies and hidden symbols.",
    genre_value: "thriller",
  },
  {
    name: "Scythe",
    author: "Neal Shusterman",
    published_date: "2016-11-22",
    description:
      "A young adult novel exploring a world where death has been conquered.",
    genre_value: "young_adult",
  },
  {
    name: "Grimm’s Fairy Tales",
    author: "Jacob & Wilhelm Grimm",
    published_date: "1812-01-01",
    description: "A collection of traditional folklore and fairy tales.",
    genre_value: "folklore",
  },
  {
    name: "Neuromancer",
    author: "William Gibson",
    published_date: "1984-07-01",
    description:
      "A foundational cyberpunk novel about hackers and artificial intelligence.",
    genre_value: "cyberpunk",
  },
  {
    name: "The Time Machine",
    author: "H. G. Wells",
    published_date: "1895-05-07",
    description:
      "A science fiction novel about time travel and future societies.",
    genre_value: "sci_fi",
  },
  {
    name: "The Hobbit",
    author: "J. R. R. Tolkien",
    published_date: "1937-09-21",
    description: "A fantasy adventure preceding The Lord of the Rings.",
    genre_value: "fantasy",
  },
  {
    name: "The Nightingale",
    author: "Kristin Hannah",
    published_date: "2015-02-03",
    description: "A historical fiction novel set during World War II.",
    genre_value: "historical_fiction",
  },
  {
    name: "Death of a Salesman",
    author: "Arthur Miller",
    published_date: "1949-02-10",
    description:
      "A dramatic play about family, failure, and the American Dream.",
    genre_value: "drama",
  },
  {
    name: "Gone Girl",
    author: "Gillian Flynn",
    published_date: "2012-06-05",
    description: "A psychological thriller about a mysterious disappearance.",
    genre_value: "psychological_thriller",
  },
  {
    name: "Boneshaker",
    author: "Cherie Priest",
    published_date: "2009-09-29",
    description: "A steampunk novel set in an alternate-history Seattle.",
    genre_value: "steampunk",
  },
  {
    name: "The Grapes of Wrath",
    author: "John Steinbeck",
    published_date: "1939-04-14",
    description:
      "A social realism novel about hardship during the Great Depression.",
    genre_value: "social_realism",
  },
  {
    name: "The Diary of a Young Girl",
    author: "Anne Frank",
    published_date: "1947-06-25",
    description:
      "An autobiographical account of a Jewish girl hiding during WWII.",
    genre_value: "autobiography",
  },
  {
    name: "Steve Jobs",
    author: "Walter Isaacson",
    published_date: "2011-10-24",
    description: "A biography of Apple co-founder Steve Jobs.",
    genre_value: "biography",
  },
  {
    name: "Animal Farm",
    author: "George Orwell",
    published_date: "1945-08-17",
    description: "A satirical novella about power and corruption.",
    genre_value: "satire",
  },
  {
    name: "To Kill a Mockingbird",
    author: "Harper Lee",
    published_date: "1960-07-11",
    description: "A classic work of fiction dealing with race and justice.",
    genre_value: "fiction",
  },
  {
    name: "The Raven",
    author: "Edgar Allan Poe",
    published_date: "1845-01-29",
    description: "A famous narrative poem about loss and grief.",
    genre_value: "poem",
  },
  {
    name: "Cinderella",
    author: "Charles Perrault",
    published_date: "1697-01-01",
    description: "A classic fairy tale about kindness and transformation.",
    genre_value: "fairy_tale",
  },
  {
    name: "The Secret History",
    author: "Donna Tartt",
    published_date: "1992-09-01",
    description: "A dark academic novel often classified as new adult.",
    genre_value: "new_adult",
  },
  {
    name: "Good Omens",
    author: "Terry Pratchett & Neil Gaiman",
    published_date: "1990-05-01",
    description: "A comedic novel about angels, demons, and the apocalypse.",
    genre_value: "comedy",
  },
  {
    name: "Pride and Prejudice",
    author: "Jane Austen",
    published_date: "1813-01-28",
    description: "A romantic novel about manners, marriage, and morality.",
    genre_value: "romance",
  },
  {
    name: "The Hound of the Baskervilles",
    author: "Arthur Conan Doyle",
    published_date: "1902-04-01",
    description: "A Sherlock Holmes mystery involving a legendary beast.",
    genre_value: "mystery",
  },
  {
    name: "The Handmaid’s Tale",
    author: "Margaret Atwood",
    published_date: "1985-08-17",
    description: "A dystopian novel about a totalitarian future society.",
    genre_value: "dystopian_fiction",
  },
  {
    name: "1984",
    author: "George Orwell",
    published_date: "1949-06-08",
    description: "A novel depicting a surveillance-driven authoritarian state.",
    genre_value: "novel",
  },
  {
    name: "The Great Romance",
    author: "Anonymous",
    published_date: "1881-01-01",
    description: "An early example of utopian science fiction.",
    genre_value: "utopian_fiction",
  },
  {
    name: "The Bourne Identity",
    author: "Robert Ludlum",
    published_date: "1980-01-01",
    description: "An action-packed spy thriller about identity and survival.",
    genre_value: "action",
  },
];

const populateBooks = async (bookArr, client) => {
  const bookCount = await db.getAllBookCount();
  if (bookCount !== 0) return;
  const genreValueAndId = await db.getGenreValueAndId();

  try {
    await client.query("BEGIN");
    for (item of bookArr) {
      const bookGenreObj = await genreValueAndId.find(
        (genre) => genre.genre_value === item.genre_value
      );

      if (!bookGenreObj) {
        throw new Error(`Genre not found for value: ${item.genre_value}`);
      }
      const bookGenreId = bookGenreObj.id;
      await client.query(
        "INSERT INTO book (name, author, published_date, description, genre_id) VALUES ($1,$2,$3,$4,$5)",
        [
          item.name,
          item.author,
          item.published_date,
          item.description,
          bookGenreId,
        ]
      );
    }
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  }
};
const populateGenre = async (arr, client) => {
  const genreCount = await db.getGenreCount();

  // checks if genre table already contains genres
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

// getting connection string from .env file
const connectionString =
  argv[2] === "productiondb"
    ? process.env.PRODUCTION_DB_CONNECTION_STRING
    : process.env.LOCAL_DB_CONNECTION_STRING;

const main = async () => {
  console.log("seeding...");
  const client = new Client({
    connectionString: connectionString,
  });

  await client.connect();
  await client.query(SQL);
  await populateGenre(initialGenres, client);
  await populateBooks(books, client);
  await client.end();
};

main();
