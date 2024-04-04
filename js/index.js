document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
  
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission
  
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
  
        if (username === "" || password === "") {
            alert('Both username and password are required to log in.');
            return;
        }

        // Assuming validUser is defined elsewhere and accessible here
        if (username === validUser.username && password === validUser.password) {
            console.log('Logging in as valid user.');
            
            // Correct place to call setUser
            setUser({ username: "Jane", password: "123" }); // Ideally, avoid storing passwords.

            window.location.href = 'home.html';
        } else {
            alert('Invalid username or password.');
        }
    });
});
