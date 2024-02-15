DROP TABLE IF EXISTS menu CASCADE;
CREATE TABLE menu (
  id SERIAL PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  allergens TEXT,
  prep_time INT NOT NULL,
  price REAL NOT NULL,
  active BOOLEAN NOT NULL,
  type TEXT NOT NULL,
  photo_url VARCHAR(255)
);
