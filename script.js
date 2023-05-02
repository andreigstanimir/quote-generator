const quoteContainer = document.querySelector(".quote-container");
const quoteText = document.querySelector(".quote-text");
const quoteAuthor = document.querySelector(".quote-author");
const btnTwitter = document.querySelector(".btn-twitter");
const btnNewQuote = document.querySelector(".btn-new-quote");
const loader = document.querySelector(".loader");

let apiQuotes = [];

function showLoadingSpinner() {
  loader.classList.remove("hidden");
  quoteContainer.classList.add("hidden");
}

function removeLoadingSpinner() {
  quoteContainer.classList.remove("hidden");
  loader.classList.add("hidden");
}

// Show new quote
function displayNewQuote() {
  // Pick a random quote from apiQuotes array
  const randomIndex = Math.floor(Math.random() * apiQuotes.length);
  const quote = apiQuotes[randomIndex];

  // Check if the author property of the quote object has a null value, and replace it with 'Unknown'
  if (!quote.author) {
    quoteAuthor.textContent = "Unknown";
  } else {
    quoteAuthor.textContent = quote.author;
  }

  // Check the quote length to determine the CSS style
  if (quote.text.length > 120) {
    quoteText.classList.add("quote-text--long");
  } else {
    quoteText.classList.remove("quote-text--long");
  }

  // Set quote, hide loader
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}

async function getQuotesFromAPI() {
  showLoadingSpinner();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Network response was not OK");

    apiQuotes = await response.json();

    displayNewQuote();
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

// Tweet quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}}`;
  // Open in a new tab
  window.open(twitterUrl, "_blank");
}

// Event Listeners
btnNewQuote.addEventListener("click", displayNewQuote);
btnTwitter.addEventListener("click", tweetQuote);

// On Load
getQuotesFromAPI();
