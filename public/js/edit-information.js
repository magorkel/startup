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

  fetch(`/api/user?username=${encodeURIComponent(username)}`)
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
        const formattedDate = formatDateToInputValue(userInfo.childBirthdate);
        document.getElementById('child_birthdate').value = formattedDate;
      }
      document.getElementById('child_class').value = userInfo.className || '';
      document.getElementById('parent_phone').value =
        userInfo.parentPhone || '';
      document.getElementById('parent_email').value =
        userInfo.parentEmail || '';
      document.getElementById('username').value = userInfo.username || '';

      document.querySelector('.user-name').textContent =
        userInfo.parentName || 'No name provided';
    })
    .catch(error => {
      console.error('Error loading user information:', error);
    });
}

function formatDateToInputValue(dateString) {
  const [year, month, day] = dateString.split('-');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

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

async function handleFormSubmit(event) {
  event.preventDefault();

  const username = localStorage.getItem('currentUsername');
  const childBirthdate = document.getElementById('child_birthdate').value;
  const childAge = calculateAge(childBirthdate);
  const classDetails = getClassAndSchedule(childBirthdate);
  const updatedUserInfo = {
    parentName: document.getElementById('parent_name').value,
    childName: document.getElementById('child_name').value,
    childBirthdate: childBirthdate,
    age: childAge,
    className: classDetails.className,
    classSchedule: classDetails.classSchedule,
    parentPhone: document.getElementById('parent_phone').value,
    parentEmail: document.getElementById('parent_email').value,
    username: username,
  };

  await fetch('/api/user/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedUserInfo),
  })
    .then(response => {
      console.log(response);
      if (!response.ok) {
        throw new Error(
          'Failed to update user information inside if !response'
        );
      }
      console.log('hitting outside');
      return response.json();
    })
    .then(data => {
      alert('User information updated successfully');
      //window.location.href = 'profile-information.html';
    })
    .catch(error => {
      //console.log('help');
      //console.error('Error during user information update:', error);
      //alert('Failed to update user information: ' + (error.message || JSON.stringify(error)));
    });
}

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

function calculateAge(birthdate) {
  const birthDate = new Date(birthdate);
  const difference = Date.now() - birthDate.getTime();
  const ageDate = new Date(difference);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
