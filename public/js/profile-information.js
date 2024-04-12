document.addEventListener('DOMContentLoaded', () => {
  const username = localStorage.getItem('currentUsername');

  if (username) {
    fetch(`/api/user?username=${encodeURIComponent(username)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch user information');
        }
        return response.json();
      })
      .then(userInfo => {
        // Display profile information
        document.getElementById('parentName').textContent =
          userInfo.parentName || 'Not provided';
        document.getElementById('childName').textContent =
          userInfo.childName || 'Not provided';
        document.getElementById('childBirthdate').textContent =
          formatDate(userInfo.childBirthdate) || 'Not provided';
        document.getElementById('childAge').textContent =
          userInfo.age + ' years' || 'Not provided';
        document.getElementById('childClass').textContent =
          userInfo.className || 'Not provided';
        document.getElementById('classTimes').textContent =
          userInfo.classSchedule || 'Not provided';
        document.getElementById('parentPhone').textContent =
          userInfo.parentPhone || 'Not provided';
        document.getElementById('parentEmail').textContent =
          userInfo.parentEmail || 'Not provided';
        document.getElementById('username').textContent =
          userInfo.username || 'Not provided';

        // Update the user name in the profile photo container
        const userNameDisplay = document.querySelector('.user-name');
        if (userNameDisplay) {
          userNameDisplay.textContent =
            userInfo.parentName || 'No name provided';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        window.location.href = 'index.html'; // Redirect to login page if fetch fails
      });
  } else {
    // Redirect to login page if no username is found in local storage
    window.location.href = 'index.html';
  }
});

function formatDate(dateString) {
  // Split the date string into parts
  const [year, month, day] = dateString
    .split('-')
    .map(part => parseInt(part, 10));

  // Create a new date object using local time
  const date = new Date(year, month - 1, day);

  // Format the date as "Month Day, Year" in local time
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function calculateAge(birthdate) {
  const birthDate = new Date(birthdate);
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
