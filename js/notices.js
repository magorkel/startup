document.addEventListener('DOMContentLoaded', () => {
    // TODO: This function will be responsible for calling the Quote of the Day API.
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
        */
    }

    // This function updates the DOM with the quote text.
    function displayQuote(quoteText, author) {
        const balletQuoteElement = document.querySelector('.ballet-quote');
        const quoteAuthorElement = document.querySelector('.quote-author');
        
        // Update the text content
        balletQuoteElement.textContent = `“${quoteText}”`;
        quoteAuthorElement.textContent = `- ${author}`;
    }

    // Initial call to fetch the quote of the day
    fetchQuoteOfTheDay();
});
