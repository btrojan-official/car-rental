// index.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Simple route for the root URL
app.get('/', (req, res) => {
  res.send('Hello, World! Welcome to your Express server.');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  //dsadsad
});
