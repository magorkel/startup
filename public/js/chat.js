document.addEventListener('DOMContentLoaded', () => {
  // Selecting elements from the DOM
  const sendButton = document.querySelector('.send-button');
  const inputMessage = document.querySelector('.input-message');
  const chatContainer = document.querySelector('.chat-container');

  // Retrieving user information from local storage
  const username = localStorage.getItem('currentUsername');
  const isAdmin = username === 'admin';
  const userId = localStorage.getItem('currentUserId'); // The logged-in user's ID
  const currentChatUserId = localStorage.getItem('currentChatUserId'); // The ID of the user the admin is currently chatting with

  console.log('currentChatUserId ' + currentChatUserId);

  // Establishing WebSocket connection
  const protocol = isAdmin ? 'admin-special-token' : 'user-token';
  const socket = new WebSocket(`ws://${location.host}`, protocol);

  // Redirect to login page if required information is missing
  if (!username || !userId || (isAdmin && !currentChatUserId)) {
    console.error('Missing user information in local storage');
    window.location.href = 'login.html';
    return;
  }

  // Function to load chat messages for a given user
  const loadChat = userIdToLoad => {
    fetch(`/api/chat/messages?userId=${encodeURIComponent(userIdToLoad)}`, {
      credentials: 'include', // If needed for cookies
      headers: {
        // Include additional headers if needed
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          return response.json();
        }
      })
      .then(data => {
        chatContainer.innerHTML = ''; // Clear current messages
        data.messages.forEach(msg => {
          const chatBubble = document.createElement('div');
          chatBubble.classList.add(
            'message',
            msg.senderId === userId ? 'user' : 'admin'
          );
          chatBubble.textContent = msg.message;
          chatContainer.appendChild(chatBubble);
        });
        chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the latest message
      })
      .catch(error => {
        console.error('Error loading chat history:', error);
      });
  };

  // Initial chat load
  const chatUserIdToLoad =
    isAdmin && currentChatUserId ? currentChatUserId : userId;
  console.log('chatUserIdToLoad ' + chatUserIdToLoad);
  loadChat(chatUserIdToLoad);

  // Listener for the send button
  sendButton.addEventListener('click', () => {
    const messageText = inputMessage.value.trim();
    if (messageText) {
      const targetId = isAdmin ? currentChatUserId : 'admin';
      const message = {
        senderId: userId,
        targetId: targetId,
        message: messageText,
      };

      // Sending the message to the server
      fetch('/api/chat/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(message),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Message sent', data.message);
          const chatBubble = document.createElement('div');
          chatBubble.classList.add('message', isAdmin ? 'admin' : 'user');
          chatBubble.textContent = messageText;
          chatContainer.appendChild(chatBubble);
          inputMessage.value = '';
          chatContainer.scrollTop = chatContainer.scrollHeight;
        })
        .catch(error => {
          console.error('Error sending message:', error);
        });
    }
  });

  // Listener for the enter key in the input field
  inputMessage.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      sendButton.click();
    }
  });

  // Event listener for custom event to load chat history
  window.addEventListener('loadChatHistory', event => {
    const userIdToLoad = event.detail.userId;
    loadChat(chatUserIdToLoad);
  });
});
