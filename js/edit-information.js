document.addEventListener('DOMContentLoaded', () => {
    // Preload the form with current user information
    preloadFormData();

    // Handle form submission to update user information
    const form = document.querySelector('form');
    form.addEventListener('submit', handleFormSubmit);
});

function preloadFormData() {
    const userInfo = JSON.parse(localStorage.getItem('validUser'));
    if (!userInfo) return;

    document.getElementById('parent_name').value = userInfo.parentName || '';
    document.getElementById('child_name').value = userInfo.childName || '';
    document.getElementById('child_birthdate').value = userInfo.childBirthdate || '';
    // Note: child_class is derived from className in userInfo, update if necessary
    document.getElementById('child_class').value = userInfo.className || '';
    document.getElementById('parent_phone').value = userInfo.parentPhone || '';
    document.getElementById('parent_email').value = userInfo.parentEmail || '';
    document.getElementById('username').value = userInfo.username || '';
    // Password is not preloaded for security reasons
}

function handleFormSubmit(event) {
    event.preventDefault();

    const updatedUserInfo = {
        parentName: document.getElementById('parent_name').value,
        childName: document.getElementById('child_name').value,
        childBirthdate: document.getElementById('child_birthdate').value,
        className: document.getElementById('child_class').value, // Assuming class name is directly editable; adjust as needed
        parentPhone: document.getElementById('parent_phone').value,
        parentEmail: document.getElementById('parent_email').value,
        username: document.getElementById('username').value,
        // Include password change only if a new password has been entered
        password: document.getElementById('password').value || JSON.parse(localStorage.getItem('validUser')).password
    };

    // Update localStorage with new user info
    localStorage.setItem('validUser', JSON.stringify(updatedUserInfo));

    // Redirect to profile information page to see changes
    window.location.href = 'profile-information.html';
}
