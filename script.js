const addButton = document.querySelector("#add");
const dialog = document.querySelector("dialog");
const librarySection = document.querySelector(".card-grid");
const authorInput = document.querySelector("#author");
const titleInput = document.querySelector("#title");
const pagesInput = document.querySelector("#pages");
const readButtonInput = document.querySelector("#read");
const submitButton = document.querySelector("#submit");
const form = document.querySelector("form");
const deleteAllButton = document.querySelector("#delete-all");

deleteAllButton.addEventListener("click", () => {
  librarySection.replaceChildren();
})

addButton.addEventListener("click", () => {
  toggleDialogDiplay();
})

dialog.addEventListener("click", (e) => {
  if (e.target === dialog){
    toggleDialogDiplay();
  }
})

const library = [];

function Book(id, author, title, pages, read){
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.id = id;
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(id, author, title, pages, read) {
  const bookToAdd = new Book(id, author, title, pages, read)
  library.push(bookToAdd);
}

Book.prototype.toggleRead = function() {
  this.read = !(this.read);
}

// Create placeholders
addBookToLibrary(crypto.randomUUID(), "Juan Emar", "Umbral", 4000, true);
addBookToLibrary(crypto.randomUUID(), "Vyasa", "Mahābhārata", 13000, false);
addBookToLibrary(crypto.randomUUID(), "Yumeno Kyusaku", "Dogra Magra", 700, false);
addBookToLibrary(crypto.randomUUID(), "Alberto Laiseca", "El jardín de las máquinas parlantes", 800, false);

function addBooksToLibrary() {
  // Not so sure if should comment this
  // Clear all sections's children 
  librarySection.replaceChildren();

  // Create element that represents book
  for (let book of library) {
    const article = document.createElement("article");

    article.setAttribute("data-user-id", book.id);

    const titleH2 = document.createElement("h2");
    titleH2.textContent = book.title;
    titleH2.setAttribute("title", book.title);
    
    const authorP = document.createElement("p");
    authorP.textContent = book.author;
    authorP.setAttribute("title", book.author);

    const pagesP = document.createElement("p");
    pagesP.textContent = book.pages;

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("actions");
    
    const readButton = document.createElement("button");
    readButton.textContent = "read";
    if (!(book.read)) readButton.classList.add("not-read");
    readButton.addEventListener("click", () => {
      toggleBtnBgColor(readButton);
      book.toggleRead();
    })

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X"
    deleteButton.addEventListener("click", () => {
      librarySection.removeChild(article);
    })

    buttonsDiv.appendChild(readButton);
    buttonsDiv.appendChild(deleteButton);
    article.appendChild(titleH2);
    article.appendChild(authorP);
    article.appendChild(pagesP);
    article.appendChild(buttonsDiv);
    librarySection.appendChild(article);
  }
}

// Add placeholders
addBooksToLibrary();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = crypto.randomUUID();
  const author = authorInput.value;
  const title = titleInput.value;
  const pages = pagesInput.value;
  const read = !(readButtonInput.classList.contains("not-read"));

  addBookToLibrary(id, author, title, pages, read);
  addBooksToLibrary();
  toggleDialogDiplay();

  form.reset();
  readButtonInput.classList.remove("not-read");
})

readButtonInput.addEventListener("click", () => {
  toggleBtnBgColor(readButtonInput);
})

function toggleBtnBgColor(button){
  button.classList.toggle("not-read");
}

function toggleDialogDiplay() {
  if (dialog.style.display === "flex"){
    dialog.style.display = "none";
  } else {
    dialog.style.display = "flex"
  }
}