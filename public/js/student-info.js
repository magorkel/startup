// student-info.js

// Function to parse query parameters from the URL
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id'); // Get the student ID from the query string
}

// Function to fetch and display the student's information
function fetchStudentInfo(studentId) {
    const baseUrl = window.location.hostname === 'localhost' ?
        'http://localhost:4000' : 'https://ballet260.click';
  fetch(`${baseUrl}/api/student?id=${encodeURIComponent(studentId)}`)
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to fetch student information');
          }
          return response.json();
      })
      .then(studentInfo => {
          // Assuming you have HTML elements with these IDs to display the student info
          document.getElementById('studentName').textContent = studentInfo.childName || 'Name not provided';
          document.getElementById('parentName').textContent = studentInfo.parentName || 'Parent name not provided';
          document.getElementById('parentPhone').textContent = studentInfo.parentPhone || 'Phone not provided';
          document.getElementById('parentEmail').textContent = studentInfo.parentEmail || 'Email not provided';
          document.getElementById('studentClass').textContent = studentInfo.className || 'Class not provided';
          document.getElementById('classTime').textContent = studentInfo.classSchedule || 'Schedule not provided';
      })
      .catch(error => {
          console.error('Error:', error);
          // Handle the error, possibly by showing an error message to the user
      });
}

document.addEventListener('DOMContentLoaded', () => {
  const studentId = getQueryParams(); // Get the student ID from the URL
  if (studentId) {
      fetchStudentInfo(studentId); // Fetch and display the student's info if an ID was provided
  } else {
      console.log('No student ID provided in the URL');
      // Optionally, handle this case more gracefully, such as redirecting to an error page or displaying a message
  }
});


/*document.addEventListener('DOMContentLoaded', () => {
    // Retrieve user information from localStorage
    const studentInfo = JSON.parse(localStorage.getItem('validUser')); // Adjust 'validUser' if you use a different key
    //const userInfo = JSON.parse(localStorage.getItem('validUser'));

    // Update the UI with the information from localStorage
    document.getElementById('studentName').textContent = `Name of Student: ${studentInfo.childName}`;
    document.getElementById('parentName').textContent = studentInfo.parentName;
    document.getElementById('parentPhone').textContent = studentInfo.parentPhone;
    document.getElementById('parentEmail').textContent = studentInfo.parentEmail;
    document.getElementById('studentClass').textContent = studentInfo.className;
    document.getElementById('classTime').textContent = studentInfo.classSchedule;

    document.querySelector('.user-name').textContent = studentInfo.parentName || 'No name provided';
  });*/
  