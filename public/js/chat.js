document.addEventListener('DOMContentLoaded', () => {
  const sendButton = document.querySelector('.send-button');
  const inputMessage = document.querySelector('.input-message');
  const chatContainer = document.querySelector('.chat-container');
  const username = localStorage.getItem('currentUsername');
  const isAdmin = username === 'admin';

  // WebSocket connection
  const protocol = isAdmin ? 'admin-special-token' : 'user-token'; // Token based on user role
  const socket = new WebSocket(`ws://${location.host}`, protocol);

  // Check if the username exists in local storage
  if (!username) {
    console.error('No username found in local storage');
    // Optionally, redirect to login page
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
      document.querySelector('.user-name').textContent =
        userInfo.parentName || 'No name provided';
    })
    .catch(error => {
      console.error('Error loading user information:', error);
      // Consider redirecting to login page or showing an error message
    });

  fetch('/api/chat/messages')
    .then(async response => {
      console.log('inside fetch');
      console.log(response);
      return await response.json();
    })
    .then(data => {
      console.log(data);
      data.messages.forEach(msg => {
        const chatBubble = document.createElement('div');
        chatBubble.classList.add(
          'message',
          msg.senderId === username ? 'user' : 'other'
        );
        chatBubble.textContent = msg.message;
        chatContainer.appendChild(chatBubble);
      });
      chatContainer.scrollTop = chatContainer.scrollHeight;
    })
    .catch(error => console.error('Error loading chat history:', error));

  socket.addEventListener('open', function (event) {
    console.log('Connected to WebSocket server');
  });

  socket.addEventListener('message', function (event) {
    try {
      const data = JSON.parse(event.data);
      const chatBubble = document.createElement('div');
      chatBubble.classList.add(
        'message',
        data.from === username ? 'user' : 'other'
      );
      chatBubble.textContent = data.message;

      chatContainer.appendChild(chatBubble);
      chatContainer.scrollTop = chatContainer.scrollHeight;
    } catch (e) {
      console.error('Error parsing WebSocket message:', e);
      // Handle non-JSON messages or show a fallback message
    }
  });

  socket.addEventListener('close', function (event) {
    console.log('Disconnected from WebSocket server');
  });

  socket.addEventListener('error', function (event) {
    console.error('WebSocket error:', event);
  });

  sendButton.addEventListener('click', () => {
    const messageText = inputMessage.value.trim();

    // Check if the message is not empty
    if (messageText) {
      socket.send(JSON.stringify({ message: messageText }));
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
  inputMessage.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      sendButton.click();
    }
  });
});
