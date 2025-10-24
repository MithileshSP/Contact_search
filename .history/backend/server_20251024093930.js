
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./src/config/config");

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.

app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM login WHERE username = ? AND password = ?";

    db.query(sql, [username, password], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Server error" });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "Invalid username or password" });
        }
        return res.json(results);
    });
});

app.get('/student_details', (req, res) => {
    const sql = 'SELECT * FROM student_details';
    
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching student details:', err);
        res.status(500).json({ error: 'Database query error' });
      } else {
        res.json(results);
      }
    });
  });
  app.get('/student_details/:rollno', (req, res) => {
    const { rollno } = req.params;
    const sql = 'SELECT * FROM student_details WHERE rollno = ?';
    db.query(sql, [rollno], (err, results) => {
        if (err) {
            console.error('Error fetching student details:', err);
            res.status(500).json({ error: 'Database query error' });
        } else if (results.length === 0) {
            res.status(404).json({ error: 'Student not found' });
        } else {
            res.json(results[0]);
        }
    });
});


  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});