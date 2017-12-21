BEGIN;
DROP TABLE IF EXISTS books CASCADE;
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  author VARCHAR(100) NOT NULL,
  edition VARCHAR(50) NOT NULL,
  publisher VARCHAR(50) NOT NULL,

);
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL
);
INSERT INTO books (title,author,edition,publisher)
VALUES ('heart of darknes', 'Yasmin','first edition','publisher');

COMMIT;
