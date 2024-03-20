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
    adress TEXT,
    description TEXT,
    status TEXT
  )`);

  await db.run(`CREATE TABLE IF NOT EXISTS project_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER,
    img TEXT,
    is_main INTEGER DEFAULT 0,
    FOREIGN KEY(project_id) REFERENCES projects(id)
  )`);

  return db;
}

module.exports = sqliteConnection;