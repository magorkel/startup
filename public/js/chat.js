document.addEventListener('DOMContentLoaded', () => {
  const sendButton = document.querySelector('.send-button');
  const inputMessage = document.querySelector('.input-message');
  const chatContainer = document.querySelector('.chat-container');
  const username = localStorage.getItem('currentUsername');

  // Check if the username exists in local storage
  if (!username) {
      console.error('No username found in local storage');
      // Optionally, redirect to login page
      return;
  }

  // Fetch the updated user name from the server
  /*const baseUrl = window.location.hostname === 'localhost' ?
        'http://localhost:4000' : 'https://ballet260.click';*/
  fetch(`/api/user?username=${encodeURIComponent(username)}`)
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to fetch user information');
          }
          return response.json();
      })
      .then(userInfo => {
          document.querySelector('.user-name').textContent = userInfo.parentName || 'No name provided';
      })
      .catch(error => {
          console.error('Error loading user information:', error);
          // Consider redirecting to login page or showing an error message
      });

  sendButton.addEventListener('click', () => {
      const messageText = inputMessage.value.trim();

      // Check if the message is not empty
      if (messageText) {
          // Create a new chat bubble
          const chatBubble = document.createElement('div');
          chatBubble.classList.add('message', 'user');
          chatBubble.textContent = messageText;

          // Append to chat container and clear input
          chatContainer.appendChild(chatBubble);
          inputMessage.value = '';

          // Scroll to the bottom of the chat container
          chatContainer.scrollTop = chatContainer.scrollHeight;
      }
  });

  // Optionally, send message with Enter key
  inputMessage.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
          sendButton.click();
      }
  });
});
