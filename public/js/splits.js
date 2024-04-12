// splits.js

document.addEventListener('DOMContentLoaded', () => {
  const username = localStorage.getItem('currentUsername'); // Retrieve the username saved in localStorage

  if (username) {
    fetch(`/api/user?username=${encodeURIComponent(username)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch user information');
        }
        return response.json();
      })
      .then(userInfo => {
        // Update the user name in the top right corner
        const userNameDisplay = document.querySelector('.user-name');
        if (userNameDisplay) {
          userNameDisplay.textContent =
            userInfo.parentName || 'No name provided';
        }
        // Assuming the userInfo object contains the parentName

        // If you want to fetch and display the quote of the day
        // Here you could call the function that fetches the quote
        fetchQuoteOfTheDay();
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle the error, perhaps redirect to login or show a message
      });
  } else {
    // Redirect to login page if no username is found in local storage
    window.location.href = 'index.html';
  }
});
