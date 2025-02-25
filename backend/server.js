const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

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
               c.luggage_capacity, c.milage_limit, c.class, c.status, c.price_per_day
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
        SELECT r.id, r.start_date, r.end_date, r.return_date, r.status, r.reservation_price, car_id
        FROM reservations r;`
    
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

app.post('/register', (req, res) => {
    const name = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;
    const phone_number = req.body.phone_number;
    const country_id = req.body.country_id;
    const password = req.body.password;
    const password_repeat = req.body.password_repeat;

    if (!name || !surname || !email || !phone_number || !country_id || !password || !password_repeat) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (password !== password_repeat) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    try {
        // Log user data (excluding password)
        console.log({
            name,
            surname,
            email,
            phone_number,
            country_id,
            password,
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
