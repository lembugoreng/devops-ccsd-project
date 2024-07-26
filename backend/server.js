const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 5001;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Change this to your MySQL user
    password: '', // Change this to your MySQL password
    database: 'todolistdb'
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

// Create table
app.get('/createTable', (req, res) => {
    const sql = `CREATE TABLE IF NOT EXISTS tasks (
                    id INT AUTO_INCREMENT,
                    description VARCHAR(255),
                    completed BOOLEAN DEFAULT false,
                    PRIMARY KEY (id)
                 )`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Tasks table created');
    });
});

// Insert task
app.post('/addTask', (req, res) => {
    const task = { description: req.body.description };
    const sql = 'INSERT INTO tasks SET ?';
    db.query(sql, task, (err, result) => {
        if (err) throw err;
        res.send('Task added');
    });
});

// Get tasks
app.get('/getTasks', (req, res) => {
    const sql = 'SELECT * FROM tasks';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Update task
app.put('/updateTask/:id', (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    const sql = 'UPDATE tasks SET completed = ? WHERE id = ?';
    db.query(sql, [completed, id], (err, result) => {
        if (err) throw err;
        res.send('Task updated');
    });
});

// Delete task
app.delete('/deleteTask/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM tasks WHERE id = ?';
    db.query(sql, id, (err, result) => {
        if (err) throw err;
        res.send('Task deleted');
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
