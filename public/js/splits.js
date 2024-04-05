// splits.js

document.addEventListener('DOMContentLoaded', () => {
    // Assume the user's information is stored in local storage under 'validUser'
    const userInfo = JSON.parse(localStorage.getItem('validUser'));
  
    if (userInfo) {
        // Set the name in the profile photo container
        const userNameDisplay = document.querySelector('.user-name');
        userNameDisplay.textContent = userInfo.parentName || 'No name provided';
    } else {
        // Handle the case where there is no user info in local storage
        console.log('No user information found in local storage.');
    }
});
