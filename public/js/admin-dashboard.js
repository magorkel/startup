// Sample data structure for classes and students
const classes = [
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
  ];
  
  document.addEventListener('DOMContentLoaded', () => {
    // Corrected: Targeting the #classesContainer for appending class lists
    const classesContainer = document.querySelector('#classesContainer');
  
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

    document.querySelector('.user-name').textContent = userInfo.parentName || 'No name provided';
  });
  