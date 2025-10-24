const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createPool({
  uri: process.env.DATABASE_URL,  // ✅ single env variable
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 20,
});

connection.getConnection((err, conn) => {
  if (err) {
    console.error("Error connecting to database:", err);
  } else {
    console.log("Connected to database");
    conn.release();
  }
});

module.exports = connection;
