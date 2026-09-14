const myLibrary = [];

function Book(title, author, pages, read) {
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
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

addBookToLibrary("Harry", "J.K.", 359, false);
addBookToLibrary("Metro 2034", "Dmitrij Glukhovsky", 153, true);
addBookToLibrary("Think and grow rich", "Napoleon Hill", 512, true);
addBookToLibrary("Scripts of the damned", "Becky", 884, false);


const table = document.querySelector("tbody");

function addCell(book) {
  lastRowCells = table.lastChild.cells
  if (lastRowCells) {
    stringIndex = lastRowCells[0].innerText
    index = Number(stringIndex)
    index += 1
  } else {
    index = 1
  }

  const row = table.insertRow();
  const idCell = row.insertCell(0);
  const nameCell = row.insertCell(1);
  const authorCell = row.insertCell(2);
  const pagesCell = row.insertCell(3);
  const statusCell = row.insertCell(4);

  idCell.innerText = index;
  index += 1;

  nameCell.innerText = book.title;
  authorCell.innerText = book.author;
  pagesCell.innerText = book.pages;
  statusCell.innerText = book.readStatus;
}

function updateTable(library) {
  library.forEach(book => {
    addCell(book)
  })
}

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

  addCell(myLibrary.at(-1));
  dialog.close();
}


bookForm.addEventListener("submit", formToTable);
updateTable(myLibrary);
