// Assuming validation is successful
const validUser = {
    username: "Jane",
    password: "123" // In a real application, don't store passwords like this
  };
  
  // Store user information in localStorage
  localStorage.setItem('validUser', JSON.stringify(validUser));
  