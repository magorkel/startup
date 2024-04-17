document.addEventListener('DOMContentLoaded', () => {
  const classesContainer = document.querySelector('#classesContainer');
  const username = localStorage.getItem('currentUsername');
  localStorage.setItem('parentName', 'Harley');

  if (!username) {
    console.error('No username found in local storage');
    window.location.href = 'login.html'; // Redirect to login if no username is found
    return;
  }

  // Check if the user is an admin and redirect non-admin users to the home page
  fetch('/api/check-admin', {
    credentials: 'include',
  })
    .then(response => response.json())
    .then(data => {
      if (!data.isAdmin) {
        window.location.href = 'home.html'; // Redirect non-admin users to home
      } else {
        fetchUpdatedClasses(); // Fetch updated class data only if the user is admin
      }
    })
    .catch(error => {
      console.error('Error checking admin status:', error);
    });

  function fetchUpdatedClasses() {
    fetch('/api/classes')
      .then(response => response.json())
      .then(data => {
        classesContainer.innerHTML = ''; // Clear previous class data
        data.forEach(cl => {
          const section = document.createElement('section');
          const classTitle = document.createElement('h3');
          classTitle.textContent = cl.name;

          const classTimes = document.createElement('p');
          classTimes.textContent = `Times: ${cl.times}`;

          const studentList = document.createElement('ul');
          cl.students.forEach(student => {
            const studentItem = document.createElement('li');
            const studentLink = document.createElement('a');
            studentLink.href = `student-info.html?childName=${encodeURIComponent(
              student.childName
            )}`;
            studentLink.textContent = student.childName;
            studentLink.className = 'student-link';

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

  // Fetch user info to display their name
  fetch(`/api/user?username=${encodeURIComponent(username)}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch user information');
      }
      return response.json();
    })
    .then(userInfo => {
      document.querySelector('.user-name').textContent =
        userInfo.parentName || 'No name provided'; // Set the user's name in the header
    })
    .catch(error => {
      console.error('Error loading user information:', error);
      window.location.href = 'login.html'; // Redirect to login page on error
    });
});
