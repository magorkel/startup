document.addEventListener('DOMContentLoaded', () => {
    // Retrieve user information from localStorage
    const userInfo = JSON.parse(localStorage.getItem('validUser'));

    if (userInfo) {
        // Update the child information section
        document.getElementById('childName').textContent = userInfo.childName || 'Not provided';
        document.getElementById('childClass').textContent = userInfo.className; // Updated to use dynamic data
        document.getElementById('classSchedule').textContent = userInfo.classSchedule; // Updated to use dynamic data
        
        // Update the user name in the profile photo container, if needed
        document.querySelector('.user-name').textContent = userInfo.parentName || 'No name provided';
    } else {
        // If no user is logged in, redirect to login page or show a message
        window.location.href = 'index.html'; // Redirect to login page
    }
});
