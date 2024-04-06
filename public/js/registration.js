// registration.js
//import {saveUserDetails} from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');

    registrationForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const userDetails = {
            parentName: document.getElementById('parent_name').value.trim(),
            childName: document.getElementById('child_name').value.trim(),
            childBirthdate: document.getElementById('child_birthdate').value.trim(),
            parentPhone: document.getElementById('parent_phone').value.trim(),
            parentEmail: document.getElementById('parent_email').value.trim(),
            username: document.getElementById('new_username').value.trim(),
            password: document.getElementById('new_password').value.trim()
        };

        // Ensure all required fields are filled
        if (!userDetails.parentName || !userDetails.childName || !userDetails.childBirthdate || !userDetails.parentPhone || !userDetails.parentEmail || !userDetails.username || !userDetails.password) {
            alert('All fields are required.');
            return;
        }

        const classDetails = getClassAndSchedule(userDetails.childBirthdate);
        userDetails.className = classDetails.className;
        userDetails.classSchedule = classDetails.classSchedule;

        fetch('http://localhost:4000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userDetails),
        })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok.');
        })
        .then(data => {
            console.log(data.message);
            alert('Registration Successful');
            localStorage.setItem('currentUsername', userDetails.username);
            window.location.href = 'home.html';
        })
        .catch(error => {
            console.error('Error during registration:', error);
            alert('Registration failed');
        });

        /*if (typeof window.saveUserDetails === "function") {
            window.saveUserDetails(userDetails);
            window.location.href = 'home.html'; 
        } else {
            console.error('saveUserDetails function is not accessible.');
        }*/
    });
});

function getClassAndSchedule(childBirthdate) {
    const birthdate = new Date(childBirthdate);
    const ageDifMs = Date.now() - birthdate.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);

    let className = '';
    let classSchedule = '';

    if (age === 3) {
        className = 'Creative Movement';
        classSchedule = 'Mondays 3:00-3:25 pm';
    } else if (age >= 4 && age <= 5) {
        className = 'Creative Ballet';
        classSchedule = 'Mondays and Wednesdays 3:30-4:00 pm';
    } else if (age >= 6 && age <= 7) {
        className = 'Pre-Ballet';
        classSchedule = 'Mondays and Wednesdays 4:00-4:45 pm';
    } else if (age >= 8 && age <= 9) {
        className = 'Level 1';
        classSchedule = 'Mondays and Wednesdays 4:45-5:45 pm';
    } else if (age >= 10 && age <= 11) {
        className = 'Level 2';
        classSchedule = 'Mondays, Wednesdays and Fridays 5:45-7:00 pm';
    } else if (age >= 12 && age <= 14) {
        className = 'Level 3';
        classSchedule = 'Mondays, Wednesdays and Fridays 7:00-8:30 pm';
    } else if (age >= 15 && age <= 16) {
        className = 'Level 4';
        classSchedule = 'Tuesdays, Thursdays and Fridays 5:30-7:00 pm';
    } else {
        className = 'Not available';
        classSchedule = 'Please contact us for more information.';
    }

    return { className, classSchedule };
}

function saveUserDetails(userDetails) {
  const classDetails = getClassAndSchedule(userDetails.childBirthdate);
  userDetails.className = classDetails.className;
  userDetails.classSchedule = classDetails.classSchedule;

  localStorage.setItem('validUser', JSON.stringify(userDetails));
}