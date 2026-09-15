let myLibrary = [];

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
  const deleteCell = row.insertCell(5);

  idCell.innerText = index;
  index += 1;

  nameCell.innerText = book.title;
  authorCell.innerText = book.author;
  pagesCell.innerText = book.pages;
  statusCell.innerText = book.readStatus;

  const delButton = document.createElement("button");
  delButton.innerHTML = "<img src='cross.svg' alt='' height='25'>";
  delButton.className = "book-del-btn";
  delButton.setAttribute("data-id", book.id);
  delButton.addEventListener("click", (e) => {
    removeBook(e)
  })

  deleteCell.append(delButton);
  deleteCell.className = "delete-cell"
}

function updateTable(library) {
  const numOfRows = table.childElementCount;

  for (let i = numOfRows - 1; i > 0 ; i--) {
    table.deleteRow(i);
  }
  library.forEach(book => {
    addCell(book)
  })
}

/// Processing user's input from Add Book form

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
  bookForm.reset()
  dialog.close();
}

function removeBook(event) {
  const bookId = event.srcElement.attributes["data-id"].value;
  myLibrary = myLibrary.filter((book) => book.id != bookId);
  updateTable(myLibrary)
}



bookForm.addEventListener("submit", formToTable);
updateTable(myLibrary);