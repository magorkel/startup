document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.querySelector('.send-button');
    const inputMessage = document.querySelector('.input-message');
    const chatContainer = document.querySelector('.chat-container');
    const userInfo = JSON.parse(localStorage.getItem('validUser'));
    document.querySelector('.user-name').textContent = userInfo.parentName || 'No name provided';
    
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
  