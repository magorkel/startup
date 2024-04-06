const express = require('express');
const app = express();
const PORT = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.static('public'));

app.use(express.json());

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

let users = [];
const staticUser = {
  parentName: 'Jane Doe',
  childName: 'Jonny Doe',
  childBirthdate: '01/01/2012',
  childAge: '14',
  parentPhone: '12345678',
  parentEmail: 'jane.doe@gmail.com',
  className: 'Pre-Ballet',
  classSchedule: 'Mondays and Wednesdays 4:00-4:45 pm',
  username: 'Jane',
  password: '123' 
};
users.push(staticUser);

apiRouter.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === staticUser.username && password === staticUser.password) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Login failed' });
  }
});

apiRouter.post('/register', (req, res) => {
  const { parentName, childName, childBirthdate, parentPhone, parentEmail, username, password, className, classSchedule } = req.body;
  
  // Check if the user already exists
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' }); // 409 Conflict
  }

  const newUser = { parentName, childName, childBirthdate, parentPhone, parentEmail, username, password, className, classSchedule };
  users.push(newUser); // Add the new user to the "database"

  // Respond with success
  res.status(201).json({ message: 'Registration successful' });
});

// Endpoint to get user information by username
apiRouter.get('/user', (req, res) => {
  const { username } = req.query;

  const user = users.find(u => u.username === username);

  if (user) {
    const { password, ...userWithoutPassword } = user; // Exclude password from the response
    res.json(userWithoutPassword);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});
