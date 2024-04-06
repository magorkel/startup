document.addEventListener('DOMContentLoaded', () => {
    
    const username = localStorage.getItem('currentUsername');

    if (username) {
        fetch(`http://localhost:4000/api/user?username=${encodeURIComponent(username)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch user information');
                }
                return response.json();
            })
            .then(userInfo => {
                // Display profile information
                document.getElementById('parentName').textContent = userInfo.parentName || 'Not provided';
                document.getElementById('childName').textContent = userInfo.childName || 'Not provided';
                document.getElementById('childBirthdate').textContent = formatDate(userInfo.childBirthdate) || 'Not provided';
                document.getElementById('childAge').textContent = calculateAge(userInfo.childBirthdate) + ' years' || 'Not provided';
                document.getElementById('childClass').textContent = userInfo.className || 'Not provided';
                document.getElementById('classTimes').textContent = userInfo.classSchedule || 'Not provided';
                document.getElementById('parentPhone').textContent = userInfo.parentPhone || 'Not provided';
                document.getElementById('parentEmail').textContent = userInfo.parentEmail || 'Not provided';
                document.getElementById('username').textContent = userInfo.username || 'Not provided';

                // Optionally, update the user name in the profile photo container
                document.querySelector('.user-name').textContent = userInfo.parentName || 'No name provided';
            })
            .catch(error => {
                console.error(error);
                window.location.href = 'index.html'; // Redirect to login page if fetch fails
            });
    } else {
        // Redirect to login page if no username is found in local storage
        window.location.href = 'index.html';
    }
    
    // Retrieve user information from localStorage
    /*const userInfo = JSON.parse(localStorage.getItem('validUser'));

    if (userInfo) {
        // Display profile information
        document.getElementById('parentName').textContent = userInfo.parentName || 'Not provided';
        document.getElementById('childName').textContent = userInfo.childName || 'Not provided';
        document.getElementById('childBirthdate').textContent = formatDate(userInfo.childBirthdate) || 'Not provided';
        document.getElementById('childAge').textContent = calculateAge(userInfo.childBirthdate) + ' years' || 'Not provided';
        document.getElementById('childClass').textContent = userInfo.className || 'Not provided';
        document.getElementById('classTimes').textContent = userInfo.classSchedule || 'Not provided';
        document.getElementById('parentPhone').textContent = userInfo.parentPhone || 'Not provided';
        document.getElementById('parentEmail').textContent = userInfo.parentEmail || 'Not provided';
        document.getElementById('username').textContent = userInfo.username || 'Not provided';

        // Optionally, update the user name in the profile photo container
        document.querySelector('.user-name').textContent = userInfo.parentName || 'No name provided';
    } else {
        // Redirect to login page if no user information is found
        window.location.href = 'index.html';
    }*/
});

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}

function calculateAge(birthdate) {
    const birthDate = new Date(birthdate);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}
