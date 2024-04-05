// student-info.js

document.addEventListener('DOMContentLoaded', () => {
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
  });
  