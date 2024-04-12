document.addEventListener('DOMContentLoaded', () => {
  const classesContainer = document.querySelector('#classesContainer');
  const username = localStorage.getItem('currentUsername');

  if (!username) {
      console.error('No username found in local storage');
      return;
  }

  fetchUpdatedClasses();

    function fetchUpdatedClasses() {
        fetch('/api/classes')
            .then(response => response.json())
            .then(data => {
                classesContainer.innerHTML = ''; // Clear previous data
                data.forEach(cl => {
                    const section = document.createElement('section');
                    const classTitle = document.createElement('h3');
                    classTitle.textContent = `${cl.name}`;

                    const classTimes = document.createElement('p');
                    classTimes.textContent = `Times: ${cl.times}`;

                    const studentList = document.createElement('ul');
                    cl.students.forEach(student => {
                        const studentItem = document.createElement('li');
                        const studentLink = document.createElement('a');
                        studentLink.href = `student-info.html?childName=${encodeURIComponent(student.childName)}`;
                        studentLink.textContent = student.childName; // Change 'studentName' to 'childName'
                        studentLink.className = "student-link"; // Optional: for styling purposes
                    
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
    }
  
  fetch(`/api/user?username=${encodeURIComponent(username)}`)
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
});
