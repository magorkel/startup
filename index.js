const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const { peerProxy } = require('./peerProxy');
const http = require('http');
const app = express();
const server = http.createServer(app);
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

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

const chatRouter = express.Router();
apiRouter.use('/chat', chatRouter);

const client = new MongoClient(
  `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`
);

let users = [
  {
    id: 'admin',
    parentName: 'Harley',
    username: 'Harley',
    password: '45738',
  },
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
  },
  {
    id: 'user-009',
    parentName: 'Alice Green',
    parentPhone: '555-123-4567',
    parentEmail: 'alice.green@example.com',
    username: 'AliceG',
    password: 'password9',
    childName: 'Grace Green',
    childBirthdate: '2019-06-15',
    age: calculateAge('2019-06-15'),
    className: getClassAndSchedule('2019-06-15').className,
    classSchedule: getClassAndSchedule('2019-06-15').classSchedule,
  },
  {
    id: 'user-010',
    parentName: 'Bob Gray',
    parentPhone: '555-234-5678',
    parentEmail: 'bob.gray@example.com',
    username: 'BobG',
    password: 'password10',
    childName: 'Gavin Gray',
    childBirthdate: '2020-02-20',
    age: calculateAge('2020-02-20'),
    className: getClassAndSchedule('2020-02-20').className,
    classSchedule: getClassAndSchedule('2020-02-20').classSchedule,
  },
  {
    id: 'user-011',
    parentName: 'Carol White',
    parentPhone: '555-345-6789',
    parentEmail: 'carol.white@example.com',
    username: 'CarolW',
    password: 'password11',
    childName: 'Willow White',
    childBirthdate: '2018-08-08',
    age: calculateAge('2018-08-08'),
    className: getClassAndSchedule('2018-08-08').className,
    classSchedule: getClassAndSchedule('2018-08-08').classSchedule,
  },
  {
    id: 'user-012',
    parentName: 'David King',
    parentPhone: '555-456-7890',
    parentEmail: 'david.king@example.com',
    username: 'DavidK',
    password: 'password12',
    childName: 'Kylie King',
    childBirthdate: '2019-12-01',
    age: calculateAge('2019-12-01'),
    className: getClassAndSchedule('2019-12-01').className,
    classSchedule: getClassAndSchedule('2019-12-01').classSchedule,
  },
  {
    id: 'user-013',
    parentName: 'Evelyn Knight',
    parentPhone: '555-567-8901',
    parentEmail: 'evelyn.knight@example.com',
    username: 'EvelynK',
    password: 'password13',
    childName: 'Kevin Knight',
    childBirthdate: '2017-07-07',
    age: calculateAge('2017-07-07'),
    className: getClassAndSchedule('2017-07-07').className,
    classSchedule: getClassAndSchedule('2017-07-07').classSchedule,
  },
  {
    id: 'user-014',
    parentName: 'Frank Lane',
    parentPhone: '555-678-9012',
    parentEmail: 'frank.lane@example.com',
    username: 'FrankL',
    password: 'password14',
    childName: 'Lara Lane',
    childBirthdate: '2018-05-05',
    age: calculateAge('2018-05-05'),
    className: getClassAndSchedule('2018-05-05').className,
    classSchedule: getClassAndSchedule('2018-05-05').classSchedule,
  },
  {
    id: 'user-015',
    parentName: 'Gina Fox',
    parentPhone: '555-789-0123',
    parentEmail: 'gina.fox@example.com',
    username: 'GinaF',
    password: 'password15',
    childName: 'Felix Fox',
    childBirthdate: '2021-03-15',
    age: calculateAge('2021-03-15'),
    className: getClassAndSchedule('2021-03-15').className,
    classSchedule: getClassAndSchedule('2021-03-15').classSchedule,
  },
  {
    id: 'user-016',
    parentName: 'Henry Pond',
    parentPhone: '555-890-1234',
    parentEmail: 'henry.pond@example.com',
    username: 'HenryP',
    password: 'password16',
    childName: 'Penny Pond',
    childBirthdate: '2017-11-11',
    age: calculateAge('2017-11-11'),
    className: getClassAndSchedule('2017-11-11').className,
    classSchedule: getClassAndSchedule('2017-11-11').classSchedule,
  },
  {
    id: 'user-017',
    parentName: 'Ivy Hall',
    parentPhone: '555-901-2345',
    parentEmail: 'ivy.hall@example.com',
    username: 'IvyH',
    password: 'password17',
    childName: 'Hannah Hall',
    childBirthdate: '2021-04-02',
    age: calculateAge('2021-04-02'),
    className: getClassAndSchedule('2021-04-02').className,
    classSchedule: getClassAndSchedule('2021-04-02').classSchedule,
  },
  {
    id: 'user-018',
    parentName: 'Jack Frost',
    parentPhone: '555-012-3456',
    parentEmail: 'jack.frost@example.com',
    username: 'JackF',
    password: 'password18',
    childName: 'Freddie Frost',
    childBirthdate: '2021-03-21',
    age: calculateAge('2021-03-21'),
    className: getClassAndSchedule('2021-03-21').className,
    classSchedule: getClassAndSchedule('2021-03-21').classSchedule,
  },
];

let classes = [
  {
    name: 'Creative Movement',
    times: 'Mondays 3:00-3:25 pm',
    studentNames: ['Grace Green', 'Felix Fox', 'Hannah Hall', 'Freddie Frost'],
  },
  {
    name: 'Creative Ballet',
    times: 'Mondays and Wednesdays 3:30-4:00 pm',
    studentNames: ['Gavin Gray', 'Willow White', 'Kylie King', 'Lara Lane'],
  },
  {
    name: 'Pre-Ballet',
    times: 'Mondays and Wednesdays 4:00-4:45 pm',
    studentNames: ['Kevin Knight', 'Penny Pond'],
  },
  {
    name: 'Level 1',
    times: 'Mondays and Wednesdays 4:45-5:45 pm',
    studentNames: [
      'Kyle Taylor',
      'Liam Johnson',
      'Oliver Smith',
      'Charlotte Brown',
    ],
  },
  {
    name: 'Level 2',
    times: 'Mondays, Wednesdays and Fridays 5:45-7:00 pm',
    studentNames: ['Sophia Brown'],
  },
  {
    name: 'Level 3',
    times: 'Mondays, Wednesdays and Fridays 7:00-8:30 pm',
    studentNames: ['Jonny Doe', 'Amelia Wilson', 'Mason Miller'],
  },
];

async function main() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('BalletInfo');
    const usersCollection = db.collection('users');
    const classesCollection = db.collection('classes');
    const messagesCollection = db.collection('messages');

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

    const messagesCount = await messagesCollection.countDocuments();
    if (messagesCount === 0) {
      await messagesCollection.insertOne({
        senderId: 'admin',
        targetId: 'user-001', // Replace with a default user ID if needed
        message: 'Hello, how may I help you?',
        timestamp: new Date(),
      });
      console.log(
        'Messages collection has been initialized with a welcome message.'
      );
    } else {
      console.log('Messages collection already has messages.');
    }

    /*apiRouter.post('/login', async (req, res) => {
      const { username, password } = req.body;
      const user = await usersCollection.findOne({ username: username });
      
      if (user && user.password === password) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Login failed' });
      }
    });*/
    apiRouter.post('/login', async (req, res) => {
      const { username, password } = req.body;

      if (username === 'Harley' && password === '45738') {
        res.cookie('authToken', 'admin-special-token', {
          httpOnly: true,
          secure: true,
        });
        return res
          .status(200)
          .json({ message: 'Login successful', isAdmin: true });
      }

      const user = await usersCollection.findOne({ username });
      if (user && user.password === password) {
        res.cookie('authToken', 'user-token', { httpOnly: true, secure: true });
        res.status(200).json({ message: 'Login successful', isAdmin: false });
      } else {
        res.status(401).json({ message: 'Login failed' });
      }
    });

    apiRouter.post('/register', async (req, res) => {
      const {
        parentName,
        parentPhone,
        parentEmail,
        username,
        password,
        childName,
        childBirthdate,
      } = req.body;

      try {
        const existingUser = await usersCollection.findOne({
          username: username,
        });
        if (existingUser) {
          return res.status(409).json({ message: 'User already exists' });
        }

        const age = calculateAge(childBirthdate);

        const { className, classSchedule } =
          getClassAndSchedule(childBirthdate);

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
          classSchedule,
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
      try {
        // Ensure connection to the database is established
        await client.connect();
        const db = client.db('BalletInfo');
        const usersCollection = db.collection('users');
        let user;

        if (req.query.username) {
          // Search by username if the username parameter is present
          user = await usersCollection.findOne({
            username: req.query.username,
          });
        } else if (req.query.childName) {
          // Search by childName if the childName parameter is present
          user = await usersCollection.findOne({
            childName: req.query.childName,
          });
        } else {
          // If neither parameter is provided, return an error
          return res
            .status(400)
            .json({ message: 'No search parameter provided' });
        }

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
      } finally {
        // Consider using a persistent connection instead of connecting on each request
        // If not, close the connection
        //await client.close();
      }
    });

    apiRouter.put('/user/update', async (req, res) => {
      const {
        parentName,
        childName,
        childBirthdate,
        parentPhone,
        parentEmail,
        username,
        password,
        className,
        classSchedule,
      } = req.body;

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
          classSchedule,
        };

        // Only include the password in the update if it is provided and not empty
        if (password && password.trim() !== '') {
          updateData.password = password;
        }

        // Calculate new class details if childBirthdate is updated
        if (childBirthdate && childBirthdate !== oldUser.childBirthdate) {
          const { className: newClassName, classSchedule: newClassSchedule } =
            getClassAndSchedule(childBirthdate);
          updateData.className = newClassName;
          updateData.classSchedule = newClassSchedule;

          // If class has changed, update classes collection
          if (oldUser.className !== newClassName) {
            await classesCollection.updateOne(
              { name: oldUser.className },
              { $pull: { studentNames: oldUser.childName } }
            );
            await classesCollection.updateOne(
              { name: newClassName },
              { $addToSet: { studentNames: childName } }
            );
          }
        }

        // Update the user in the database
        const result = await usersCollection.updateOne(
          { username: username },
          { $set: updateData }
        );
        if (result.modifiedCount === 0) {
          throw new Error('No changes to update.');
        }

        res
          .status(200)
          .json({ message: 'User information updated successfully' });
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
        const detailedClasses = await Promise.all(
          classesData.map(async cl => {
            const studentsDetails = await Promise.all(
              cl.studentNames.map(async studentName => {
                // Fetch each student's details
                const studentDetails = await db
                  .collection('users')
                  .findOne({ childName: studentName });
                return studentDetails
                  ? {
                      childName: studentName,
                      parentName: studentDetails.parentName,
                      age: studentDetails.age,
                      className: studentDetails.className,
                      classSchedule: studentDetails.classSchedule,
                    }
                  : { childName: studentName };
              })
            );

            return { ...cl, students: studentsDetails };
          })
        );

        res.json(detailedClasses);
      } catch (error) {
        console.error('Failed to load classes:', error);
        res.status(500).json({ message: 'Server error' });
      }
    });

    apiRouter.get('/student', async (req, res) => {
      const { username } = req.query;

      try {
        const student = await client
          .db('BalletInfo')
          .collection('users')
          .findOne({ username: username });
        if (student) {
          const studentDetails = {
            childName: student.childName,
            parentName: student.parentName,
            parentPhone: student.parentPhone,
            parentEmail: student.parentEmail,
            className: student.className,
            classSchedule: student.classSchedule,
          };
          res.json(studentDetails);
        } else {
          res.status(404).json({ message: 'Student not found' });
        }
      } catch (error) {
        console.error('Error fetching student information:', error);
        res.status(500).json({ message: 'Server error' });
      }
    });

    apiRouter.get('/check-admin', (req, res) => {
      const authToken = req.cookies['authToken'];
      // Example check, you would likely have more complex logic
      if (authToken === 'admin-special-token') {
        res.json({ isAdmin: true });
      } else {
        res.json({ isAdmin: false });
      }
    });

    // Admin verification middleware
    const verifyAdmin = async (req, res, next) => {
      // Assuming you store session or token in cookies or authorization headers
      const authToken = req.cookies['authToken'] || req.headers.authorization; // Adjust based on your auth strategy

      // Example validation (you should have your own logic here, possibly checking a database)
      if (authToken === 'admin-special-token') {
        // Replace this with actual validation logic
        next();
      } else {
        res.status(401).json({ message: 'Unauthorized: Access is denied' });
      }
    };

    const secureApiRouter = express.Router();

    // Use the verifyAdmin middleware for all routes in this router
    secureApiRouter.use(verifyAdmin);

    // Example of an admin-only route
    secureApiRouter.get('/admin-dashboard', (req, res) => {
      res.send('Admin Dashboard - Access Granted');
    });

    // Attach the secureApiRouter to your main API router
    apiRouter.use('/admin', secureApiRouter);
  } catch (ex) {
    console.error(`Unable to connect to MongoDB because ${ex.message}`);
    process.exit(1);
  }
}

main().catch(console.error);

chatRouter.get('/messages', async (req, res) => {
  await client.connect();
  console.log('Connected to MongoDB');

  const db = client.db('BalletInfo');
  const messages = db.collection('messages');

  try {
    const allMessages = await messages.find({}).toArray();
    const data = {
      messages: allMessages,
    };
    console.log(allMessages);
    res.json(data);
  } catch (error) {
    console.error('Failed to fetch messages:', error);
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
});

chatRouter.post('/messages', async (req, res) => {
  const { message, senderId, targetId } = req.body;

  console.log('Received message:', req.body); // Log the message to see if it's received correctly.

  try {
    const db = await connectDB();
    const messages = db.collection('messages');

    await messages.insertOne({
      senderId,
      targetId,
      message,
      timestamp: new Date(),
    });

    console.log('Message saved to the database.'); // Log for successful save.
    res.status(201).json({ message: 'Message saved' });
  } catch (error) {
    console.error('Failed to save message:', error); // Properly log the error.
    res.status(500).json({ message: 'Failed to save message' });
  }
});

peerProxy(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Start the server
/*app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});*/

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
        'X-Api-Key': apiKey,
      },
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
