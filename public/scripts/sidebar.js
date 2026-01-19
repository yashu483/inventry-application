const path = window.location.pathname;

if (path === "/books/add") {
  const newBookPageButton = document.querySelector("#new-book-page-button");
  newBookPageButton.classList.toggle("selected-navigation-button");
} else if (path.startsWith("/books")) {
  const booksPageButton = document.querySelector("#books-page-button");
  booksPageButton.classList.toggle("selected-navigation-button");
} else if (path === "/genres") {
  const genresPageButton = document.querySelector("#genres-page-button");
  genresPageButton.classList.toggle("selected-navigation-button");
} else {
  const homePageButton = document.querySelector("#home-page-button");
  homePageButton.classList.toggle("selected-navigation-button");
}
