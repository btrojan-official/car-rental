const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.post('/register', async (req, res) => {
    const { name, surname, email, phone_number, country_id, password } = req.body;

    if (!name || !surname || !email || !phone_number || !country_id || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Check if user already exists
        const checkUserQuery = 'SELECT id FROM users WHERE email = ? OR phone_number = ?';
        db.query(checkUserQuery, [email, phone_number], async (err, results) => {
            if (err) {
                console.error('Database query error:', err);
                return res.status(500).json({ error: 'Server error' });
            }

            if (results.length > 0) {
                return res.status(400).json({ error: 'User with this email or phone number already exists' });
            }

            // Hash the password and create ids
            const hashedPassword = await bcrypt.hash(password, 10);
            const userId = uuidv4();
            const sessionId = uuidv4();

            // Insert new user
            const insertUserQuery = `
                INSERT INTO users (id, name, surname, email, phone_number, country_id, password, session_id) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;
            db.query(insertUserQuery, [userId, name, surname, email, phone_number, country_id, hashedPassword, sessionId], (err) => {
                if (err) {
                    console.error('Database insert error:', err);
                    return res.status(500).json({ error: 'Server error' });
                }

                res.status(201).json({ message: 'User registered successfully', session_id: sessionId });
            });
        });

    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Check if user exists
        const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
        db.query(checkUserQuery, [email], async (err, results) => {
            if (err) {
                console.error('Database query error:', err);
                return res.status(500).json({ error: 'Server error' });
            }

            if (results.length === 0) {
                return res.status(401).json({ error: 'User not found' });
            }

            const user = results[0];

            // Compare passwords
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Invalid password' });
            }

            // Creates session for properly logged user
            const sessionId = uuidv4();
            const updateSessionQuery = 'UPDATE users SET session_id = ? WHERE id = ?';
            db.query(updateSessionQuery, [sessionId, user.id], (err) => {
                if (err) {
                    console.error('Database update error:', err);
                    return res.status(500).json({ error: 'Server error' });
                }

                res.status(200).json({ message: 'Login successful', session_id: sessionId });
            });
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
