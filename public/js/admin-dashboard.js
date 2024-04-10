document.addEventListener('DOMContentLoaded', () => {
  const classesContainer = document.querySelector('#classesContainer');
  const username = localStorage.getItem('currentUsername');

  // Check if username exists in local storage
  if (!username) {
      console.error('No username found in local storage');
      // Optionally, redirect to login page
      return;
  }

  // Fetch class information from the server
  /*const baseUrl = window.location.hostname === 'localhost' ?
        'http://localhost:4000' : 'https://ballet260.click';*/
  fetch(`/api/classes`)
      .then(response => {
          // Check if the response is successful, if not, throw an error
          if (!response.ok) {
              throw new Error(`Server error: ${response.statusText}`);
          }
          return response.json();
      })
      .then(data => {
          // Check if the returned data is an array
          if (!Array.isArray(data)) {
              throw new TypeError('Received data is not an array');
          }
          // Process the classes data
          data.forEach(cl => {
              const section = document.createElement('section');
              const classTitle = document.createElement('h3');
              classTitle.textContent = `${cl.name}`;
      
              const classTimes = document.createElement('p');
              classTimes.textContent = `Times: ${cl.times}`;
      
              const studentList = document.createElement('ul');
              cl.studentNames.forEach(studentName => {
                  const studentItem = document.createElement('li');
                  const studentLink = document.createElement('a');
                  
                  // In a real application, you would use a unique student ID
                  studentLink.href = `student-info.html?studentName=${encodeURIComponent(studentName)}`;
                  studentLink.textContent = studentName;

                  studentItem.appendChild(studentLink);
                  studentList.appendChild(studentItem);
              });
      
              section.appendChild(classTitle);
              section.appendChild(classTimes);
              section.appendChild(studentList);
              classesContainer.appendChild(section);
          });
      })
      .catch(error => {
          console.error('Failed to load classes:', error);
          // Here, you might want to inform the user or handle the error appropriately in the UI
      });

  // Fetch user information from the server to update the user name in the top right corner
  fetch(`${baseUrl}/api/user?username=${encodeURIComponent(username)}`)
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
