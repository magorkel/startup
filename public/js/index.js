document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === '' || password === '') {
      alert('Both username and password are required to log in.');
      return;
    }

    fetch(`/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ username: username, password: password }),
    })
      .then(response => response.json()) // Convert response to JSON
      .then(data => {
        if (data.message === 'Login successful') {
          localStorage.setItem('currentUsername', username);
          localStorage.setItem('isAdmin', data.isAdmin);
          if (data.userId) {
            // assuming that the backend would send a userId
            localStorage.setItem('currentUserId', data.userId);
          }

          // Redirect based on whether the user is admin
          if (data.isAdmin) {
            window.location.href = 'admin-dashboard.html';
          } else {
            window.location.href = 'home.html';
          }
        } else {
          alert('Invalid Login');
        }
      })
      .catch(error => {
        //console.log(data);
        console.error('Error:', error);
      });
  });
});

/*const validUser = {
    parentName: 'John Doe', 
    childName: 'Johnny Doe',
    childBirthdate: '2020-01-01',
    parentPhone: '+1234567890',
    parentEmail: 'john.doe@example.com',
    username: 'Jane',
    password: '123',
    childAge: '4',
    className: 'Creative Ballet',
    classSchedule: 'Mondays and Wednesdays 3:30-4:00 pm'
    };
    
    // Store user information in localStorage
    localStorage.setItem('validUser', JSON.stringify(validUser));*/
