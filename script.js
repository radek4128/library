const myLibrary = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  if (this.read === true) {
    this.readStatus = 'Already read'
  } else {
    this.readStatus = 'Not read'
  }
  this.info = function() {
    return `${this.title} by ${this.author}, ${pages} pages, ${this.readStatus}`;
  }
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook)
}


addBookToLibrary("Harry", "J.K.", 359, false);
addBookToLibrary("Metro 2034", "Dmitrij Glukhovsky", 153, true);
addBookToLibrary("Think and grow rich", "Napoleon Hill", 512, true);
addBookToLibrary("Scripts of the damned", "Becky", 884, false);

const table = document.getElementById("table")
console.log(table)

myLibrary.forEach(book => {
  const table_row = document.createElement("tr")
  table.appendChild(table_row)
  for (const prop in book) {
    const property = book[prop];
    if (typeof(property) === "string" || typeof(property) === "number") {
      const value = property;
      const row_elem = document.createElement("td");
      row_elem.textContent = value;
      table_row.appendChild(row_elem);
    }
  }
})