const express = require('express');
//const path = require('path');
//const bodyParser = require('body-parser');
//const jwt = require('jsonwebtoken');
const app = express();
const PORT = process.argv.length > 2 ? process.argv[2] : 4000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Set up other middleware
app.use(express.json());

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

//app.use(bodyParser.json());

//const SECRET_KEY = 'your_secret_key'; // Secret key for JWT
const staticUser = {
  username: 'Jane',
  password: '123' // In a real app, passwords should be hashed
};

apiRouter.post('/login', (req, res) => {
  const { username, password } = req.body;//line to consider

  if (username === staticUser.username && password === staticUser.password) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Login failed' });
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

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});
