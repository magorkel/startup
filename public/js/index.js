document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
      
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === "" || password === "") {
            alert('Both username and password are required to log in.');
            return;
        }
      
        fetch('http://localhost:4000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username:username, password:password }),
        })
        .then (response => { 
            if (response.status == 200)
            {
                window.location.href = 'home.html';
            }
            else
            {
                alert('Invalid Login');
            }
            response.json() })
        .catch((error) => {
          console.error('Error:', error);
        });
      });
});


const validUser = {
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
    localStorage.setItem('validUser', JSON.stringify(validUser));