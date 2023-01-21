
CREATE TABLE users(
  username TEXT,
  password TEXT,
  email TEXT UNIQUE
  );

CREATE TABLE trivias(
  category TEXT,
  title TEXT,
  picture TEXT,
  question TEXT,
  answer TEXT,
  fake_answer1 TEXT,
  fake_answer2 TEXT,
  fake_answer3 TEXT
  );

CREATE TABLE scores(
    username TEXT,
    points INTEGER
);











