document.addEventListener('DOMContentLoaded', () => {
  const sendButton = document.querySelector('.send-button');
  const inputMessage = document.querySelector('.input-message');
  const chatContainer = document.querySelector('.chat-container');
  const userNameDisplay = document.querySelector(
    '.profile-photo-container .user-name'
  );

  // Retrieve username from local storage or session management
  const username = localStorage.getItem('currentUsername');
  const userId = localStorage.getItem('currentUserId'); // The logged-in user's ID

  // Update user name in the header
  if (username) {
    userNameDisplay.textContent = username;
  } else {
    console.error('User information is missing. Redirecting to login.');
    window.location.href = 'login.html';
    return;
  }

  fetch(`/api/user?username=${encodeURIComponent(username)}`)
    .then(response => response.json())
    .then(userInfo => {
      if (userInfo) {
        userNameDisplay.textContent = userInfo.parentName || 'Anonymous'; // Update to use parentName or other appropriate user identifier
      }
    })
    .catch(error => {
      console.error('Error loading user information:', error);
    });

  // Load existing messages or listen for new ones
  const loadChat = () => {
    fetch('/api/chat/messages', {
      credentials: 'include', // If using cookies for session management
    })
      .then(response => response.json())
      .then(data => {
        chatContainer.innerHTML = ''; // Clear current messages
        data.messages.forEach(msg => {
          // Determine message bubble class based on sender
          const bubbleClass = msg.senderId === userId ? 'user' : 'other';

          // Create message bubble
          const chatBubble = document.createElement('div');
          chatBubble.className = `message ${bubbleClass}`;

          // Create sender name label if message is from another user
          if (bubbleClass === 'other') {
            const senderNameLabel = document.createElement('div');
            senderNameLabel.className = 'sender-name';
            senderNameLabel.textContent = msg.senderName || 'Unknown';
            chatContainer.appendChild(senderNameLabel);
          }

          chatBubble.textContent = msg.message;
          chatContainer.appendChild(chatBubble);
        });
        chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the latest message
      })
      .catch(error => {
        console.error('Error loading chat messages:', error);
      });
  };

  loadChat();

  // Handle sending new messages
  sendButton.addEventListener('click', () => {
    const messageText = inputMessage.value.trim();
    if (messageText) {
      const message = {
        senderId: userId,
        message: messageText,
      };

      fetch('/api/chat/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(message),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Message sent', data.message);
          inputMessage.value = ''; // Clear input after sending
          loadChat(); // Reload chat to show new message
        })
        .catch(error => {
          console.error('Error sending message:', error);
        });
    }
  });

  // Support for pressing Enter to send a message
  inputMessage.addEventListener('keypress', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      sendButton.click();
      e.preventDefault(); // Prevent the default action to avoid form submission
    }
  });
});
