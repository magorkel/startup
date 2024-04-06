// Sample data structure for classes and students
/*const classes = [
    {
      name: "Creative Movement",
      times: "Mondays 3:00-3:25 pm",
      students: ["Student A", "Student B"]
    },
    {
      name: "Creative Ballet",
      times: "Mondays and Wednesdays 3:30-4:00 pm",
      students: ["Student C", "Student D"]
    },
    {
      name: "Pre-Ballet",
      times: "Mondays and Wednesdays 4:00-4:45 pm",
      students: ["Student E", "Student F"]
    },
    // Add more classes as needed
  ];*/
  
  document.addEventListener('DOMContentLoaded', () => {
    const classesContainer = document.querySelector('#classesContainer');
    const username = localStorage.getItem('currentUsername');

    // Check if username exists in local storage
    if (!username) {
        console.error('No username found in local storage');
        return; // Optionally, redirect to login page
    }

    // Fetch class information from the server
    fetch('http://localhost:4000/api/classes')
        .then(response => response.json())
        .then(classes => {
            classes.forEach(cl => {
                const section = document.createElement('section');
                const classTitle = document.createElement('h3');
                classTitle.textContent = `${cl.name}`;
        
                const classTimes = document.createElement('p');
                classTimes.textContent = `Times: ${cl.times}`;
        
                const studentList = document.createElement('ul');
                cl.students.forEach(student => {
                    const studentItem = document.createElement('li');
                    const studentLink = document.createElement('a');

                    // Assuming student is uniquely identified by their name for demonstration purposes
                    // In a real application, you would use a unique student ID
                    studentLink.href = `student-info.html?studentName=${encodeURIComponent(student)}`;
                    studentLink.textContent = student.childName;

                    studentItem.appendChild(studentLink);
                    studentList.appendChild(studentItem);
                });
        
                section.appendChild(classTitle);
                section.appendChild(classTimes);
                section.appendChild(studentList);
                classesContainer.appendChild(section);
            });
        })
        .catch(error => console.error('Failed to load classes:', error));

    // Fetch user information from the server to update the user name in the top right corner
    fetch(`http://localhost:4000/api/user?username=${encodeURIComponent(username)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch user information');
            }
            return response.json();
        })
        .then(userInfo => {
            document.querySelector('.user-name').textContent = userInfo.parentName || 'No name provided';
        })
        .catch(error => {
            console.error('Error loading user information:', error);
            // Consider redirecting to login page or showing an error message
        });

    // Corrected: Targeting the #classesContainer for appending class lists
    /*const classesContainer = document.querySelector('#classesContainer');
  
    const userInfo = JSON.parse(localStorage.getItem('validUser'));

    classes.forEach(cl => {
      const section = document.createElement('section');
      const classTitle = document.createElement('h3');
      classTitle.textContent = `${cl.name}`;
  
      const classTimes = document.createElement('p');
      classTimes.textContent = `Times: ${cl.times}`;
  
      const studentList = document.createElement('ul');
      cl.students.forEach(student => {
        const studentItem = document.createElement('li');
        const studentLink = document.createElement('a');
        studentLink.href = 'student-info.html'; // Assuming this leads to a generic student info page
        studentLink.textContent = student;
        studentItem.appendChild(studentLink);
        studentList.appendChild(studentItem);
      });
  
      section.appendChild(classTitle);
      section.appendChild(classTimes);
      section.appendChild(studentList);
      classesContainer.appendChild(section); // Corrected to append to classesContainer
    });

    document.querySelector('.user-name').textContent = userInfo.parentName || 'No name provided';*/
  });
  