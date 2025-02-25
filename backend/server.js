const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'car_rental_db'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// List all cars with make and model
app.get('/cars', (req, res) => {
    const query = `
        SELECT c.id, cm.model_name, cmk.make_name, c.number_of_seats, c.gearbox, 
               c.luggage_capacity, c.milage_limit, c.class, c.status, c.price_per_day, c.number_plate
        FROM cars c
        JOIN car_model cm ON c.model_id = cm.id
        JOIN cars_makes cmk ON cm.car_make_id = cmk.id`;
    
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

// List all users
app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

// List all reservations
app.get('/reservations', (req, res) => {
    const query = `
        SELECT r.id, r.start_date, r.end_date, r.return_date, r.status, r.reservation_price, r.paid_price,
               u.name AS user_name, u.surname AS user_surname, c.number_plate
        FROM reservations r
        JOIN users u ON r.user_id = u.id
        JOIN cars c ON r.car_id = c.id`;
    
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
