const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createPool({
  host: process.env.DB_HOST,      
  user: process.env.DB_USER,      
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 20,
  ssl: {
    reje
    DB_CA_CERT: process.env.DB_CA_CERT
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
