"use strict";

const allBooksLink = document.querySelector("#all-books");
const genresLink = document.querySelector("#genres");

allBooksLink.addEventListener("click", (e) => {
  window.location.href = "/books";
});

allBooksLink.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    allBooksLink.click();
  }
});

genresLink.addEventListener("click", (e) => {
  window.location.href = "/genres";
});

genresLink.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    genresLink.click();
  }
});
