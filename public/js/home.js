document.addEventListener('DOMContentLoaded', () => {
  checkIfAdminAndRedirect();
  function checkIfAdminAndRedirect() {
    fetch('/api/check-admin', { credentials: 'include' })
      .then(response => response.json())
      .then(data => {
        if (data.isAdmin) {
          window.location.href = 'admin-dashboard.html'; // Redirect admin users to dashboard
        }
      })
      .catch(error => console.error('Error checking admin status:', error));
  }

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
          classScheduleElement.textContent =
            userInfo.classSchedule || 'Please contact us for more information.';
        }

        // Update the parent's name display
        const userNameDisplay = document.querySelector('.user-name');
        if (userNameDisplay) {
          userNameDisplay.textContent =
            userInfo.parentName || 'No name provided';
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
