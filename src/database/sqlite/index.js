const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')
const path = require("path")

async function sqliteConnection(){
  const db = await sqlite.open({
    filename: path.resolve(__dirname, "..", "database.db"),
    driver: sqlite3.Database
  })

  await db.run(`CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT
  )`);

  return db;
}

module.exports = sqliteConnection;