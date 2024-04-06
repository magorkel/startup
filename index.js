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

let students = [
  {
      id: 'student-001',
      childName: 'Alex Smith',
      parentName: 'Jordan Smith',
      parentPhone: '555-0101',
      parentEmail: 'jordan.smith@example.com',
      className: 'Creative Movement',
      classSchedule: 'Mondays 3:00-3:25 pm'
  },
  {
      id: 'student-002',
      childName: 'Bailey Johnson',
      parentName: 'Taylor Johnson',
      parentPhone: '555-0202',
      parentEmail: 'taylor.johnson@example.com',
      className: 'Creative Ballet',
      classSchedule: 'Mondays and Wednesdays 3:30-4:00 pm'
  },
  {
      id: 'student-003',
      childName: 'Casey Williams',
      parentName: 'Morgan Williams',
      parentPhone: '555-0303',
      parentEmail: 'morgan.williams@example.com',
      className: 'Pre-Ballet',
      classSchedule: 'Mondays and Wednesdays 4:00-4:45 pm'
  },
  {
      id: 'student-004',
      childName: 'Dylan Robinson',
      parentName: 'Quinn Robinson',
      parentPhone: '555-0404',
      parentEmail: 'quinn.robinson@example.com',
      className: 'Creative Movement',
      classSchedule: 'Mondays 3:00-3:25 pm'
  },
  {
      id: 'student-005',
      childName: 'Elliott King',
      parentName: 'Riley King',
      parentPhone: '555-0505',
      parentEmail: 'riley.king@example.com',
      className: 'Creative Ballet',
      classSchedule: 'Mondays and Wednesdays 3:30-4:00 pm'
  },
  {
      id: 'student-006',
      childName: 'Finley Davis',
      parentName: 'Sawyer Davis',
      parentPhone: '555-0606',
      parentEmail: 'sawyer.davis@example.com',
      className: 'Pre-Ballet',
      classSchedule: 'Mondays and Wednesdays 4:00-4:45 pm'
  }
];

let classes = [
  {
      name: "Creative Movement",
      times: "Mondays 3:00-3:25 pm",
      studentIds: ["student-001", "student-004"] // Referencing by student ID
  },
  {
      name: "Creative Ballet",
      times: "Mondays and Wednesdays 3:30-4:00 pm",
      studentIds: ["student-002", "student-005"] // Referencing by student ID
  },
  {
      name: "Pre-Ballet",
      times: "Mondays and Wednesdays 4:00-4:45 pm",
      studentIds: ["student-003", "student-006"] // Referencing by student ID
  },
  // Add more classes as needed
];

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

apiRouter.put('/user/update', (req, res) => {
  const { parentName, childName, childBirthdate, parentPhone, parentEmail, username, password, className, classSchedule } = req.body;
  
  const userIndex = users.findIndex(u => u.username === username);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Update user information
  users[userIndex] = { ...users[userIndex], parentName, childName, childBirthdate, parentPhone, parentEmail, password, className, classSchedule };
  
  res.json({ message: 'User information updated successfully' });
});

apiRouter.get('/classes', (req, res) => {
  try {
    const detailedClasses = classes.map(cl => {
      const studentsDetails = cl.studentIds.map(id => {
        const student = students.find(s => s.id === id);
        return student || { id: id, childName: "Unknown" };
      });

      return { ...cl, students: studentsDetails }; // Attach student details
    });

    res.json(detailedClasses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});
