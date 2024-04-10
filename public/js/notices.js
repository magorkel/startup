document.addEventListener('DOMContentLoaded', () => {
    // This function updates the DOM with the quote text.
    function displayQuote(quoteText, author) {
        const balletQuoteElement = document.querySelector('.ballet-quote');
        const quoteAuthorElement = document.querySelector('.quote-author');
        
        // Update the text content
        balletQuoteElement.textContent = `“${quoteText}”`;
        quoteAuthorElement.textContent = `- ${author}`;
    }

    function fetchQuoteOfTheDay() {
        fetch('/api/random-quote') // This should match the endpoint you've set up in your server
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Assuming the API returns an object with a quote and an author field
                displayQuote(data.quote, data.author);
            })
            .catch(error => {
                console.error('Error fetching quote of the day:', error);
                displayQuote("Failed to load quote of the day. Please try again later.", "");
            });
    }
    

    const username = localStorage.getItem('currentUsername'); // Retrieve the username saved in localStorage

    if (username) {
        const baseUrl = window.location.hostname === 'localhost' ?
        'http://localhost:4000' : 'https://ballet260.com';
        fetch(`${baseUrl}/api/user?username=${encodeURIComponent(username)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch user information');
                }
                return response.json();
            })
            .then(userInfo => {
                // Update the user name in the top right corner
                const userNameDisplay = document.querySelector('.user-name');
                if (userNameDisplay) {
                    userNameDisplay.textContent = userInfo.parentName || 'No name provided';
                }
                // Assuming the userInfo object contains the parentName
                
                // If you want to fetch and display the quote of the day
                // Here you could call the function that fetches the quote
                fetchQuoteOfTheDay();
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle the error, perhaps redirect to login or show a message
            });
    } else {
        // Redirect to login page if no username is found in local storage
        window.location.href = 'index.html';
    }

    // Initial call to fetch the quote of the day
    fetchQuoteOfTheDay();
});


/*document.addEventListener('DOMContentLoaded', () => {
    // TODO: This function will be responsible for calling the Quote of the Day API.

    const userInfo = JSON.parse(localStorage.getItem('validUser'));

    function fetchQuoteOfTheDay() {
        const quoteText = "Dance is the hidden language of the soul of the body.";
        const quoteAuthor = "Martha Graham";
        displayQuote(quoteText, quoteAuthor);
        
        // In a real scenario, you would make an API call here
        // using fetch() or another AJAX method, like so:
        /*
        fetch('https://api.example.com/quoteoftheday')
            .then(response => response.json())
            .then(data => {
                const quoteText = data.quote;
                const quoteAuthor = data.author;
                displayQuote(quoteText, quoteAuthor);
            })
            .catch(error => {
                console.error('Error fetching quote of the day:', error);
                displayQuote("Failed to load quote of the day. Please try again later.");
            });
        
    }

    // This function updates the DOM with the quote text.
    function displayQuote(quoteText, author) {
        const balletQuoteElement = document.querySelector('.ballet-quote');
        const quoteAuthorElement = document.querySelector('.quote-author');
        
        // Update the text content
        balletQuoteElement.textContent = `“${quoteText}”`;
        quoteAuthorElement.textContent = `- ${author}`;
    }

    document.querySelector('.user-name').textContent = userInfo.parentName || 'No name provided';
    // Initial call to fetch the quote of the day
    fetchQuoteOfTheDay();
});*/
