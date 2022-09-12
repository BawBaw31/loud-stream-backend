import { Database } from "bun:sqlite";

const db = new Database("mydb.sqlite");

db.run(
  "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT UNIQUE, role TEXT DEFAULT user,password TEXT)"
);

export default db;
