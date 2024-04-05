document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
  
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission
  
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
  
        const validUser = JSON.parse(localStorage.getItem('validUser'));
    
        if (username === "" || password === "") {
            alert('Both username and password are required to log in.');
            return;
        }

        // Assuming validUser is defined elsewhere and accessible here
        if (username === validUser.username && password === validUser.password) {
            console.log('Logging in as valid user.');
            window.location.href = 'home.html';
        } else {
            alert('Invalid username or password.');
        }
    });
});

const validUser = {
    parentName: 'John Doe', 
    childName: 'Johnny Doe',
    childBirthdate: '2010-01-01',
    parentPhone: '+1234567890',
    parentEmail: 'john.doe@example.com',
    username: 'Jane',
    password: '123'
    };
    
    // Store user information in localStorage
    localStorage.setItem('validUser', JSON.stringify(validUser));