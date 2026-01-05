#! /usr/bin/env node
const { argv } = require("node:process");
require("dotenv").config();

const { Client } = require("pg");

const SQL = `CREATE TABLE IF NOT EXISTS genre (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS book (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
name VARCHAR (255),
author VARCHAR (255),
published_date DATE,
description TEXT,
genre_id INTEGER,
FOREIGN KEY (genre_id) REFERENCES genre(id)
)`;

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
  await client.end();

  console.log("done");
};

main();
