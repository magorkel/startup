function fetchStudentInfo(childName) {
    fetch(`/api/user?childName=${encodeURIComponent(childName)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch student information');
            }
            return response.json();
        })
        .then(userInfo => {
            document.getElementById('studentName').textContent = userInfo.childName || 'Name not provided';
            document.getElementById('parentName').textContent = userInfo.parentName || 'Parent name not provided';
            document.getElementById('parentPhone').textContent = userInfo.parentPhone || 'Phone not provided';
            document.getElementById('parentEmail').textContent = userInfo.parentEmail || 'Email not provided';
            document.getElementById('studentClass').textContent = userInfo.className || 'Class not provided';
            document.getElementById('classTime').textContent = userInfo.classSchedule || 'Schedule not provided';
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const childName = params.get('childName');
    if (childName) {
        fetchStudentInfo(childName); 
    } else {
        console.log('No child name provided in the URL');
    }
});
  