const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuote = [];

const loading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const complete = () => {
  loader.hidden = true;
  quoteContainer.hidden = false;
};

// Api call

const newQuote = () => {
  loading();
  const quote = apiQuote[Math.floor(Math.random() * apiQuote.length)];
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  quoteText.textContent = quote.text;

  complete();
};

const getQuotes = async () => {
  loading();
  //   const proxyUrl = "https://whispering-tor-04671.herokuapp.com/";
  const apiUrl = "https://type.fit/api/quotes";
  try {
    let response = await fetch(apiUrl);
    apiQuote = await response.json();
    newQuote();
  } catch (error) {
    alert(`there is an error which is ${error}`);
  }
};
getQuotes();

const twitterQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
};

newQuoteBtn.addEventListener("click", getQuotes);
twitterBtn.addEventListener("click", twitterQuote);
