//requiring the express library
const sqlite3 = require('sqlite3').verbose();

//requiring the express library
const express = require('express');

//requiring the cors library
const cors = require('cors');

//sets up server
const app = express();
app.use(express.json()); // Allow JSON requests
app.use(cors()); // Allow cross-origin requests (server and client can be on different ports)

// Database connection
const db = new sqlite3.Database('./book.sqlite');

// Create Table if not exists
db.run("CREATE TABLE IF NOT EXISTS Book (title TEXT, author TEXT, price REAL)");

// Add Book API
app.post('/addBook', (req, res) => {
    const { title, author, price } = req.body;
    const sql = "INSERT INTO Book (title, author, price) VALUES (?, ?, ?)";
    db.run(sql, [title, author, price], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Book added successfully!" });
    });
});

// Get Books API
app.get('/getBooks', (req, res) => {
    const sql = "SELECT * FROM Book";
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Delete Book API
app.post('/deleteBook', (req, res) => {
    const sql = "DELETE FROM Book WHERE title = ?";
    const { title } = req.body;
    db.run(sql, [title], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Book deleted successfully!" });
    });
});

// Update Book API
app.post('/updateBook', (req, res) => {
    const { price, title } = req.body;
    const sql = "UPDATE Book SET price = ? WHERE title = ?";
    db.run(sql, [price, title], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Book updated successfully!" });
    });
});

// Start Server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
