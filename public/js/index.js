document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        if (username === "" || password === "") {
            alert('Both username and password are required to log in.');
            return;
        }

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                console.log('Logging in as valid user.');
                // Here you could also store the received token in localStorage
                localStorage.setItem('token', data.token);
                window.location.href = 'home.html';
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('An error occurred. Please try again.');
        }
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