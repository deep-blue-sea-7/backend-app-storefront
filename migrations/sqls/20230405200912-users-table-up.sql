CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  password_digest VARCHAR(255) NOT NULL
);