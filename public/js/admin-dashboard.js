document.addEventListener('DOMContentLoaded', () => {
  const classesContainer = document.querySelector('#classesContainer');
  const username = localStorage.getItem('currentUsername');

  if (!username) {
    console.error('No username found in local storage');
    return;
  }
  fetch('/api/check-admin', {
    credentials: 'include',
  })
    .then(response => response.json())
    .then(data => {
      if (!data.isAdmin) {
        window.location.href = 'home.html'; // Redirect non-admin users to home
      } else {
        fetchUpdatedClasses();
      }
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle errors, possibly redirect to login page
    });

  function loadChatHistory(userId) {
    // Save the selected user ID to local storage
    localStorage.setItem('currentChatUserId', userId);

    // Now, redirect to the chat page or refresh it
    // If you are already on the chat page and just need to refresh the chat:
    if (window.location.pathname === '/chat.html') {
      window.dispatchEvent(new Event('loadChatHistory'));
    } else {
      // If you are not on the chat page, redirect to it
      window.location.href = 'chat.html';
    }
  }

  function fetchUsers() {
    fetch('/api/users') // Adjust this to your API for fetching users
      .then(response => response.json())
      .then(users => {
        const usersDropdown = document.getElementById('usersDropdown'); // Assuming you have a <select> element with this ID
        usersDropdown.innerHTML = '';
        users.forEach(user => {
          const option = document.createElement('option');
          option.value = user.id;
          option.textContent = `${user.parentName} (${user.username})`;
          usersDropdown.appendChild(option);
        });
      })
      .catch(error => console.error('Error fetching users:', error));
  }

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
            studentLink.href = `student-info.html?childName=${encodeURIComponent(
              student.childName
            )}`;
            studentLink.textContent = student.childName; // Change 'studentName' to 'childName'
            studentLink.className = 'student-link'; // Optional: for styling purposes

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
      document.querySelector('.user-name').textContent =
        userInfo.parentName || 'No name provided';
    })
    .catch(error => {
      console.error('Error loading user information:', error);
      // Consider redirecting to login page or showing an error message
    });

  fetchUsers();

  document
    .getElementById('usersDropdown')
    .addEventListener('change', function () {
      const newUserId = this.value;
      localStorage.setItem('currentChatUserId', newUserId); // Save to local storage

      console.log(newUserId);

      // Dispatch a custom event with the new user's ID
      const event = new CustomEvent('loadChatHistory', {
        detail: { userId: newUserId },
      });
      window.dispatchEvent(event);
    });
});
