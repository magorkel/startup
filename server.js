const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Set up other middleware
app.use(express.json());

app.use(bodyParser.json());

const SECRET_KEY = 'your_secret_key'; // Secret key for JWT
const staticUser = {
  username: 'Jane',
  password: '123' // In a real app, passwords should be hashed
};

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === staticUser.username && password === staticUser.password) {
    // Generate a token
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: "Login successful", token });
  } else {
    res.status(401).json({ message: "Authentication failed" });
  }
});

// Add more of your endpoints here
app.get('/api/data', (req, res) => {
  // Return some JSON or handle a service
  res.json({ message: "This is your data." });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
