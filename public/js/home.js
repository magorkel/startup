document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('currentUsername');

    if (username) {
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
                // Update child's name
                const childNameElement = document.getElementById('childName');
                if (childNameElement) {
                    childNameElement.textContent = userInfo.childName || 'Not provided';
                }

                // Update class name (previously was 'childClass' in HTML)
                const childClassElement = document.getElementById('childClass');
                if (childClassElement) {
                    childClassElement.textContent = userInfo.className || 'Not available';
                }

                // Update class schedule (previously was 'className' in HTML which seems to be incorrect)
                const classScheduleElement = document.getElementById('classSchedule');
                if (classScheduleElement) {
                    classScheduleElement.textContent = userInfo.classSchedule || 'Please contact us for more information.';
                }

                // Update the parent's name display
                const userNameDisplay = document.querySelector('.user-name');
                if (userNameDisplay) {
                    userNameDisplay.textContent = userInfo.parentName || 'No name provided';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                window.location.href = 'index.html';
            });
    } else {
        window.location.href = 'index.html';
    }
});

/*document.addEventListener('DOMContentLoaded', () => {
    
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
                // Update the child information section
                document.getElementById('childName').textContent = userInfo.childName || 'Not provided';
                document.getElementById('childClass').textContent = userInfo.className; // Updated to use dynamic data
                document.getElementById('classSchedule').textContent = userInfo.classSchedule; // Updated to use dynamic data
                
                // Update the user name in the profile photo container, if needed
                document.querySelector('.user-name').textContent = userInfo.parentName || 'No name provided';
            })
            .catch(error => {
                console.error(error);
                // Handle the error (e.g., by redirecting to the login page)
                window.location.href = 'index.html';
            });
    } else {
        // If no username is stored, redirect to login page or show a message
        window.location.href = 'index.html'; // Redirect to login page
    }
    
    // Retrieve user information from localStorage
    /*const userInfo = JSON.parse(localStorage.getItem('validUser'));

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
});*/
