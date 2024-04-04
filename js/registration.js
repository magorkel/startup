document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm'); // Ensure you have an id="registrationForm" on your form

    registrationForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const parentName = document.getElementById('parent_name').value.trim();
        const childName = document.getElementById('child_name').value.trim();
        const childBirthdate = document.getElementById('child_birthdate').value.trim();
        const parentPhone = document.getElementById('parent_phone').value.trim();
        const parentEmail = document.getElementById('parent_email').value.trim();
        const username = document.getElementById('new_username').value.trim();
        const password = document.getElementById('new_password').value.trim();

        // Simple input validation
        if (!parentName || !childName || !childBirthdate || !parentPhone || !parentEmail || !username || !password) {
            alert('All fields are required.');
            return;
        }

        // Save user information
        saveNewUser({ parentName, childName, childBirthdate, parentPhone, parentEmail, username, password });

        // Redirect to home page or login page
        window.location.href = 'home.html'; // Adjust as necessary, e.g., to a login page
    });
});

function saveNewUser(userInfo) {
    // Assuming you'll use the username as a unique key
    localStorage.setItem(userInfo.username, JSON.stringify(userInfo));
}
