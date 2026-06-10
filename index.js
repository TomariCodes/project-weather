let searchFormElement = document.getElementById("search-form");
let searchInputElement = document.getElementById("search-input");
let cityTextElement = document.getElementById("current-city");

function performSearch(event) {
  event.preventDefault();
  let searchInput = searchInputElement.value;
  cityTextElement.innerHTML = searchInput;
  console.log("Performing search for:", searchInput);
}

searchFormElement.addEventListener("submit", performSearch);
