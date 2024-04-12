const express = require('express');
const cors = require('cors'); 
const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const app = express();
const PORT = process.argv.length > 2 ? process.argv[2] : 4000;

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:4000', 
  'https://startup.ballet260.click',
];

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

const client = new MongoClient(`mongodb+srv://${config.userName}:${config.password}@${config.hostname}`);

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
    className: getClassAndSchedule('2012-01-01').className,
    classSchedule: getClassAndSchedule('2012-01-01').classSchedule,
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
    className: getClassAndSchedule('2014-05-21').className,
    classSchedule: getClassAndSchedule('2014-05-21').classSchedule,
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
    className: getClassAndSchedule('2013-08-30').className,
    classSchedule: getClassAndSchedule('2013-08-30').classSchedule,
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
    className: getClassAndSchedule('2015-09-15').className,
    classSchedule: getClassAndSchedule('2015-09-15').classSchedule,
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
    className: getClassAndSchedule('2011-04-18').className,
    classSchedule: getClassAndSchedule('2011-04-18').classSchedule,
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
    className: getClassAndSchedule('2012-03-17').className,
    classSchedule: getClassAndSchedule('2012-03-17').classSchedule,
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
    age: calculateAge('2014-07-19'),
    className: getClassAndSchedule('2014-07-19').className,
    classSchedule: getClassAndSchedule('2014-07-19').classSchedule,
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
    className: getClassAndSchedule('2014-07-19').className,
    classSchedule: getClassAndSchedule('2014-07-19').classSchedule,
  }
];

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

async function main() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('BalletInfo'); 
    const usersCollection = db.collection('users');
    const classesCollection = db.collection('classes');

    const usersCount = await usersCollection.countDocuments();
    if (usersCount === 0) {
      await usersCollection.insertMany(users);
      console.log('Users collection has been initialized.');
    } else {
      console.log('Users collection already initialized.');
    }

    const classesCount = await classesCollection.countDocuments();
    if (classesCount === 0) {
      await classesCollection.insertMany(classes);
      console.log('Classes collection has been initialized.');
    } else {
      console.log('Classes collection already initialized.');
    }

    apiRouter.post('/login', async (req, res) => {
      const { username, password } = req.body;
      const user = await usersCollection.findOne({ username: username });
      
      if (user && user.password === password) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Login failed' });
      }
    });

    apiRouter.post('/register', async (req, res) => {
      const { parentName, parentPhone, parentEmail, username, password, childName, childBirthdate } = req.body;

      try {
        const existingUser = await usersCollection.findOne({ username: username });
        if (existingUser) {
          return res.status(409).json({ message: 'User already exists' });
        }

        const age = calculateAge(childBirthdate);

        const { className, classSchedule } = getClassAndSchedule(childBirthdate);

        const newUser = {
          parentName,
          parentPhone,
          parentEmail,
          username,
          password, 
          childName,
          childBirthdate,
          age,
          className,
          classSchedule
        };

        await usersCollection.insertOne(newUser);

        const updatedClass = await classesCollection.updateOne(
          { name: className },
          { $addToSet: { studentNames: childName } }
          );

        if (updatedClass.matchedCount === 0) {
          console.error('No class found for this age group.');
        } else if (updatedClass.modifiedCount === 0) {
          console.error('Child not added to class (maybe already there?).');
        }

        res.status(201).json({ message: 'Registration successful' });
      } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Registration failed' });
      }
    });

    apiRouter.get('/user', async (req, res) => {
      const { username } = req.query;
    
      try {
        const user = await usersCollection.findOne({ username: username });
    
        if (user) {

          const response = {
            parentName: user.parentName,
            parentPhone: user.parentPhone,
            parentEmail: user.parentEmail,
            username: user.username,
            childName: user.childName,
            childBirthdate: user.childBirthdate,
            age: user.age,
            className: user.className, 
            classSchedule: user.classSchedule,
          };
    
          res.json(response);
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
    });    

    /*apiRouter.put('/user/update', async (req, res) => {
      const { parentName, childName, childBirthdate, parentPhone, parentEmail, username, password, className, classSchedule } = req.body;
      
      try {
        const result = await usersCollection.updateOne(
          { username: username },
          { $set: { parentName, childName, childBirthdate, parentPhone, parentEmail, password, className, classSchedule } }
        );
    
        if (result.modifiedCount === 0) {
          throw new Error('No document found with this username or no changes to update.');
        }
    
        res.status(200).send({message: 'User information updated successfully'})
      } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ message: 'Failed to update user information' });
      }
    });*/

    apiRouter.put('/user/update', async (req, res) => {
      const { parentName, childName, childBirthdate, parentPhone, parentEmail, username, password, className, classSchedule } = req.body;
      
      try {
          // Retrieve the existing user
          const oldUser = await usersCollection.findOne({ username });
          if (!oldUser) {
              return res.status(404).json({ message: 'User not found' });
          }
  
          // Prepare the update object
          let updateData = {
              parentName, 
              childName, 
              childBirthdate, 
              parentPhone, 
              parentEmail,
              className, 
              classSchedule
          };
  
          // Only include the password in the update if it is provided and not empty
          if (password && password.trim() !== '') {
              updateData.password = password;
          }
  
          // Calculate new class details if childBirthdate is updated
          if (childBirthdate && childBirthdate !== oldUser.childBirthdate) {
              const { className: newClassName, classSchedule: newClassSchedule } = getClassAndSchedule(childBirthdate);
              updateData.className = newClassName;
              updateData.classSchedule = newClassSchedule;
  
              // If class has changed, update classes collection
              if (oldUser.className !== newClassName) {
                  await classesCollection.updateOne({ name: oldUser.className }, { $pull: { studentNames: oldUser.childName } });
                  await classesCollection.updateOne({ name: newClassName }, { $addToSet: { studentNames: childName } });
              }
          }
  
          // Update the user in the database
          const result = await usersCollection.updateOne({ username: username }, { $set: updateData });
          if (result.modifiedCount === 0) {
              throw new Error('No changes to update.');
          }
  
          res.status(200).json({ message: 'User information updated successfully' });
      } catch (error) {
          console.error('Update error:', error);
          res.status(500).json({ message: 'Failed to update user information' });
      }
  });
  
  apiRouter.get('/classes', async (req, res) => {
      try {
          // Ensure connection to the database is established
          await client.connect();

          // Access the classes collection
          const db = client.db('BalletInfo');
          const classesCollection = db.collection('classes');

          // Fetch all classes including the dynamically updated list of students
          const classesData = await classesCollection.find({}).toArray();

          // Build detailed class data including linked student details
          const detailedClasses = await Promise.all(classesData.map(async cl => {
              const studentsDetails = await Promise.all(cl.studentNames.map(async studentName => {
                  // Fetch each student's details
                  const studentDetails = await db.collection('users').findOne({ childName: studentName });
                  return studentDetails ? {
                    childName: studentName,
                    parentName: studentDetails.parentName,
                    age: studentDetails.age,
                    className: studentDetails.className,
                    classSchedule: studentDetails.classSchedule
                  } : { childName: studentName };
              }));

            return { ...cl, students: studentsDetails };
          }));

          res.json(detailedClasses);
      } catch (error) {
          console.error('Failed to load classes:', error);
          res.status(500).json({ message: 'Server error' });
      }
    });
    
    // ... and so on for each route that needs to interact with the database

  } catch (ex) {
    console.error(`Unable to connect to MongoDB because ${ex.message}`);
    process.exit(1);
  }
}

main().catch(console.error);

/*apiRouter.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = users.find(u => u.username === username);

  // Check if user exists and password matches
  if (user && user.password === password) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Login failed' });
  }
});*/

/*apiRouter.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === staticUser.username && password === staticUser.password) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Login failed' });
  }
});*/

/*apiRouter.post('/register', (req, res) => {
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
});*/

/*apiRouter.get('/user', (req, res) => {
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
});*/

/*apiRouter.put('/user/update', (req, res) => {
  const { parentName, childName, childBirthdate, parentPhone, parentEmail, username, password, className, classSchedule } = req.body;
  
  const userIndex = users.findIndex(u => u.username === username);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Update user information
  users[userIndex] = { ...users[userIndex], parentName, childName, childBirthdate, parentPhone, parentEmail, password, className, classSchedule };
  
  res.json({ message: 'User information updated successfully' });
});*/

/*apiRouter.get('/classes', (req, res) => {
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
});*/

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
