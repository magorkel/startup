document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
      
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === "" || password === "") {
            alert('Both username and password are required to log in.');
            return;
        }

        /*const baseUrl = window.location.hostname === 'localhost' ?
        'http://localhost:4000' : 'https://startup.ballet260.click';*/

        fetch(`/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username, password: password }),
        })
        .then(response => {
            console.log(response);
            if (response.ok) { // Checks if the status code is 2xx
                localStorage.setItem('currentUsername', username); // Store username upon successful login
                window.location.href = 'home.html'; // Redirect to home page
                return response.json(); // We proceed to parse the JSON response
            } else {
                alert('Invalid Login');
                throw new Error('Login failed'); // Throw an error to break the chain
            }
        })
        .then(data => {
            console.log('Login Successful:', data.message); // Optionally log or handle the data/message
        })
        .catch(error => {
            console.error('Error:', error);
        });
      
        /*fetch('http://localhost:4000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username:username, password:password }),
        })
        .then (response => { 
            if (response.status == 200)
            {
                localStorage.setItem('currentUsername', username);
                window.location.href = 'home.html';
            }
            else
            {
                alert('Invalid Login');
            }
            response.json() })
        .catch((error) => {
          console.error('Error:', error);
        });*/
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