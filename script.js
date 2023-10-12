const form = document.getElementById("form-popup");
const cardContainer = document.getElementById("cardContainer");
const addCardButton = document.getElementById("addBook");
const closeForm = document.getElementById("closeForm");
const submit = document.getElementById("form");
const myLibrary = [];

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = false;
  this.info = function () {
    return `
      <span style="color: black">${this.title}</span> by
      <span style="color: black">${this.author}</span>,
      <span style="color: black">${this.pages}</span> pages,
      ${
        this.read
          ? '<p style="color: #031740">have read</p>'
          : '<p style="color: #73122C">have not read</p>'
      }
    `;
  };
}
function addBookToLibrary(title, author, pages, read) {
  const duplicateBook = myLibrary.find(
    (book) => book.title === title && book.author === author
  );
  if (duplicateBook) {
    const userResponse = prompt(
      "This book already exists. Do you want to update its properties? (yes or no)"
    );
    if (userResponse && userResponse.toLowerCase() === "yes") {
      duplicateBook.pages = pages;
      duplicateBook.read = read;
    }
    duplicateBook.read = read;
  } else {
    const newBook = new Book(title, author, pages);
    newBook.read = read;
    myLibrary.push(newBook);
  }
  displayLibrary();
}

function displayLibrary() {
  cardContainer.textContent = "";

  myLibrary.forEach((book, index) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const text = document.createElement("span");
    text.innerHTML = myLibrary[index].info();

    const changeStatusButton = document.createElement("button");
    changeStatusButton.classList.add("card-button");
    changeStatusButton.classList.add("read-status");
    changeStatusButton.textContent = "Change Status";
    changeStatusButton.addEventListener("click", () => {
      book.read = !book.read;
      displayLibrary();
    });

    const removeButton = document.createElement("button");
    removeButton.classList.add("card-button");
    removeButton.classList.add("remove-button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
      myLibrary.splice(index, 1);
      displayLibrary();
    });

    card.appendChild(text);
    card.appendChild(changeStatusButton);
    card.appendChild(removeButton);
    cardContainer.appendChild(card);
  });
}

addCardButton.addEventListener("click", () => {
  form.showModal();
});

closeForm.addEventListener("click", () => {
  form.close();
  clearFormFields();
});

submit.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("readStatus").checked;
  addBookToLibrary(title, author, pages, read);
  displayLibrary();
  form.close();
  clearFormFields();
});

function clearFormFields() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("readStatus").checked = false;
}
