document.addEventListener('DOMContentLoaded', () => {
    // Preload the form with current user information
    preloadFormData();

    // Handle form submission to update user information
    const form = document.querySelector('form');
    form.addEventListener('submit', handleFormSubmit);
});

function preloadFormData() {
    const username = localStorage.getItem('currentUsername');
    if (!username) {
        console.error('No username found in local storage');
        return;
    }

    const baseUrl = window.location.hostname === 'localhost' ?
        'http://localhost:4000' : 'https://ballet260.com';
    fetch(`${baseUrl}/api/user?username=${encodeURIComponent(username)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch user information');
            }
            return response.json();
        })
        .then(userInfo => {
            document.getElementById('parent_name').value = userInfo.parentName || '';
            document.getElementById('child_name').value = userInfo.childName || '';
            if (userInfo.childBirthdate) {
                const formattedDate = formatDateToYYYYMMDD(userInfo.childBirthdate);
                document.getElementById('child_birthdate').value = formattedDate;
            }
            document.getElementById('child_class').value = userInfo.className || '';
            document.getElementById('parent_phone').value = userInfo.parentPhone || '';
            document.getElementById('parent_email').value = userInfo.parentEmail || '';
            document.getElementById('username').value = userInfo.username || '';
            // Do not preload password for security reasons

            document.querySelector('.user-name').textContent = userInfo.parentName || 'No name provided';
        })
        .catch(error => {
            console.error('Error loading user information:', error);
            // Handle error, maybe redirect to login page or show an error message
        });
}

function formatDateToYYYYMMDD(dateString) {
    const date = new Date(dateString);
    let month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        year = date.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function handleFormSubmit(event) {
    event.preventDefault();

    const username = localStorage.getItem('currentUsername'); // Ensure this is set during login/registration
    const updatedUserInfo = {
        parentName: document.getElementById('parent_name').value,
        childName: document.getElementById('child_name').value,
        childBirthdate: document.getElementById('child_birthdate').value,
        className: document.getElementById('child_class').value,
        parentPhone: document.getElementById('parent_phone').value,
        parentEmail: document.getElementById('parent_email').value,
        username: username,
        password: document.getElementById('password').value // Handle password changes carefully
    };

    // Send the updated user info to the server
    fetch('http://localhost:4000/api/user/update', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserInfo),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update user information');
        }
        return response.json();
    })
    .then(data => {
        alert('User information updated successfully');
        // Optionally, update local storage if necessary or redirect
        window.location.href = 'profile-information.html'; // Redirect to profile information page to see changes
    })
    .catch(error => {
        console.error('Error during user information update:', error);
        alert('Failed to update user information');
    });
}
