const express = require('express');
const cors = require('cors'); // Include the cors package
const app = express();
const PORT = process.argv.length > 2 ? process.argv[2] : 4000;

// Define the allowed origins
const allowedOrigins = [
  'http://localhost:3000', // The domain your frontend is served on
  'http://localhost:4000', // The domain your backend is served on
  'https://your-registered-domain.com', // Replace with your actual registered domain
  // You can add more domains here
];

// Configure CORS middleware
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

// Enable pre-flight requests for all routes
app.options('*', cors(corsOptions));

// Use cors middleware with the above options
app.use(cors(corsOptions));

app.use(express.static('public'));

app.use(express.json());

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

let users = [
  {
    id: 'user-001',
    parentName: 'Jane Doe',
    parentPhone: '123-456-7890',
    parentEmail: 'jane.doe@example.com',
    username: 'Jane',
    password: '123', 
    childName: 'Jonny Doe',
    childBirthdate: '2012-01-01',
    age: calculateAge('2012-01-01'),
  },
  {
    id: 'user-002',
    parentName: 'Ethan Taylor',
    parentPhone: '321-654-0987',
    parentEmail: 'ethan.taylor@example.com',
    username: 'EthanT',
    password: '456', 
    childName: 'Kyle Taylor',
    childBirthdate: '2014-05-21',
    age: calculateAge('2014-05-21'),
  },
  {
    id: 'user-003',
    parentName: 'Olivia Brown',
    parentPhone: '456-123-4567',
    parentEmail: 'olivia.brown@example.com',
    username: 'OliviaB',
    password: 'securePassword3', 
    childName: 'Sophia Brown',
    childBirthdate: '2013-08-30',
    age: calculateAge('2013-08-30'),
  },
  {
    id: 'user-004',
    parentName: 'Michael Johnson',
    parentPhone: '789-456-1230',
    parentEmail: 'michael.johnson@example.com',
    username: 'MichaelJ',
    password: 'securePassword4', 
    childName: 'Liam Johnson',
    childBirthdate: '2015-09-15',
    age: calculateAge('2015-09-15'),
  },
  {
    id: 'user-005',
    parentName: 'Emma Wilson',
    parentPhone: '123-789-4561',
    parentEmail: 'emma.wilson@example.com',
    username: 'EmmaW',
    password: 'securePassword5', 
    childName: 'Amelia Wilson',
    childBirthdate: '2011-04-18',
    age: calculateAge('2011-04-18'),
  },
  {
    id: 'user-006',
    parentName: 'Noah Miller',
    parentPhone: '654-321-9870',
    parentEmail: 'noah.miller@example.com',
    username: 'NoahM',
    password: 'securePassword6', 
    childName: 'Mason Miller',
    childBirthdate: '2012-03-17',
    age: calculateAge('2012-03-17'),
  },
  {
    id: 'user-007',
    parentName: 'Ava Smith',
    parentPhone: '987-654-3210',
    parentEmail: 'ava.smith@example.com',
    username: 'AvaS',
    password: 'securePassword7', 
    childName: 'Oliver Smith',
    childBirthdate: '2013-05-22',
    age: calculateAge('2013-05-22'),
  },
  {
    id: 'user-008',
    parentName: 'William Brown',
    parentPhone: '321-987-6543',
    parentEmail: 'william.brown@example.com',
    username: 'WilliamB',
    password: 'securePassword8', 
    childName: 'Charlotte Brown',
    childBirthdate: '2014-07-19',
    age: calculateAge('2014-07-19'),
  }
];
/*let users = [];
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
];*/

let classes = [
  {
    name: "Creative Movement",
    times: "Mondays 3:00-3:25 pm",
    studentNames: ["Liam Johnson", "Charlotte Brown"] // Example names based on the simplified users structure
  },
  {
    name: "Creative Ballet",
    times: "Mondays and Wednesdays 3:30-4:00 pm",
    studentNames: ["Jonny Doe", "Sophia Brown", "Amelia Wilson"] // Adjusted to match user data
  },
  {
    name: "Pre-Ballet",
    times: "Mondays and Wednesdays 4:00-4:45 pm",
    studentNames: ["Kyle Taylor", "Mason Miller", "Oliver Smith"] // Adjusted to match user data
  }
];

apiRouter.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = users.find(u => u.username === username);

  // Check if user exists and password matches
  if (user && user.password === password) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Login failed' });
  }
});

/*apiRouter.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === staticUser.username && password === staticUser.password) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Login failed' });
  }
});*/

apiRouter.post('/register', (req, res) => {
  const { parentName, parentPhone, parentEmail, username, password, children } = req.body;

  // Check if the user already exists
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }

  // Create the new user with the provided class name and schedule
  const newUser = {
    id: `user-${users.length + 1}`,
    parentName,
    parentPhone,
    parentEmail,
    username,
    password, // Hash this in production
    childName: children[0].childName,
    childBirthdate: children[0].childBirthdate,
    age: calculateAge(children[0].childBirthdate),
    className: children[0].className, // Take class name from the request
    classSchedule: children[0].classSchedule, // Take class schedule from the request
  };

  users.push(newUser);
  res.status(201).json({ message: 'Registration successful' });
});

apiRouter.get('/user', (req, res) => {
  const { username } = req.query;

  const user = users.find(u => u.username === username);

  if (user) {
    // Calculate class and schedule based on child's birthdate
    const { className, classSchedule } = getClassAndSchedule(user.childBirthdate);

    // Prepare the response without the password
    const response = {
      ...user,
      className, // This should match the property name expected on the client
      classSchedule,
    };
    delete response.password; // Remove the password for security

    res.json(response);
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
      const studentsDetails = cl.studentNames.map(studentName => {
        const student = users.find(u => u.childName === studentName);
        return student || { childName: studentName };
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

function calculateAge(birthdate) {
  const birthDate = new Date(birthdate);
  const difference = Date.now() - birthDate.getTime();
  const ageDate = new Date(difference);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function getClassAndSchedule(childBirthdate) {
  const birthdate = new Date(childBirthdate);
  const ageDifMs = Date.now() - birthdate.getTime();
  const ageDate = new Date(ageDifMs); // miliseconds from epoch
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);

  let className = '';
  let classSchedule = '';

  if (age === 3) {
      className = 'Creative Movement';
      classSchedule = 'Mondays 3:00-3:25 pm';
  } else if (age >= 4 && age <= 5) {
      className = 'Creative Ballet';
      classSchedule = 'Mondays and Wednesdays 3:30-4:00 pm';
  } else if (age >= 6 && age <= 7) {
      className = 'Pre-Ballet';
      classSchedule = 'Mondays and Wednesdays 4:00-4:45 pm';
  } else if (age >= 8 && age <= 9) {
      className = 'Level 1';
      classSchedule = 'Mondays and Wednesdays 4:45-5:45 pm';
  } else if (age >= 10 && age <= 11) {
      className = 'Level 2';
      classSchedule = 'Mondays, Wednesdays and Fridays 5:45-7:00 pm';
  } else if (age >= 12 && age <= 14) {
      className = 'Level 3';
      classSchedule = 'Mondays, Wednesdays and Fridays 7:00-8:30 pm';
  } else if (age >= 15 && age <= 16) {
      className = 'Level 4';
      classSchedule = 'Tuesdays, Thursdays and Fridays 5:30-7:00 pm';
  } else {
      className = 'Not available';
      classSchedule = 'Please contact us for more information.';
  }

  return { className, classSchedule };
}

const fetch = require('node-fetch'); // Import the fetch function

// Function to get a random quote from the Quotes API
async function getRandomQuote(category) {
    const url = `https://api.api-ninjas.com/v1/quotes?category=${category}`;
    const apiKey = 'kgviXk1AtpGSROxD9Y7T8A==sU676LHiko112Yly'; // Replace with your actual X-Api-Key

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-Api-Key': apiKey
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`); // or handle error responses as needed
        }

        const data = await response.json();
        return data; // This will be an array of quotes
    } catch (error) {
        console.error('Failed to fetch quote:', error);
    }
}

// Example usage of getRandomQuote()
getRandomQuote('happiness').then(quotes => {
    if (quotes && quotes.length > 0) {
        console.log('Random Quote:', quotes[0].quote); // Log the first quote from the response
    }
});

apiRouter.get('/random-quote', async (req, res) => {
  const category = req.query.category || 'happiness'; // Use 'happiness' as a default category if none is provided
  try {
      const quotes = await getRandomQuote(category);
      if (quotes && quotes.length > 0) {
          res.json(quotes[0]); // Send the first quote from the response
      } else {
          res.status(404).json({ message: 'No quotes found' });
      }
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});
