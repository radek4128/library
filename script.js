const myLibrary = [];

function book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  if (this.read === true) {
    this.readStatus = 'Already read';
  } else {
    this.readStatus = 'Not read';
  }
  this.info = function() {
    return `${this.title} by ${this.author}, ${pages} pages, ${this.readStatus}`;
  }
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new book(title, author, pages, read);
  myLibrary.push(newBook);
}

addBookToLibrary("Harry", "J.K.", 359, false);
addBookToLibrary("Metro 2034", "Dmitrij Glukhovsky", 153, true);
addBookToLibrary("Think and grow rich", "Napoleon Hill", 512, true);
addBookToLibrary("Scripts of the damned", "Becky", 884, false);


const table = document.getElementById("table");

function updateTable(library) {
  library.forEach(book => {
    const table_row = document.createElement("tr");
    table.appendChild(table_row);
    console.log(book.author)
    for (const prop in book) {
      const property = book[prop];
      if (typeof(property) === "string" || typeof(property) === "number") {
        const row_elem = document.createElement("td");
        row_elem.textContent = property;
        table_row.appendChild(row_elem);
      }
    }
  })
}

updateTable(myLibrary);

const bookForm = document.querySelector("#book-form");
const submitter = document.querySelector(".form-submit");
const dialog = document.querySelector("#book-dialog");
const formData = new FormData(bookForm, submitter);

function formToTable(e) {
  e.preventDefault();
  const formData = new FormData(bookForm, submitter);

  addBookToLibrary(
    formData.get("book-name"),
    formData.get("author"),
    formData.get("pages"),
    formData.get("read") === "true"
  );

  updateTable(myLibrary.slice(-1));
  dialog.close();
}

bookForm.addEventListener("submit", formToTable);

const addBtn = document.querySelector(".add-button");