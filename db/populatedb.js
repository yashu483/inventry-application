#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `CREATE TABLE IF NOT EXISTS books (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
book_name VARCHAR (255)
);

INSERT INTO books (book_name) VALUES
('Atomic Habits'),
('')
`;
