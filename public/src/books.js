// Returns the author object that has the matching ID
function findAuthorById(authors, id) {
  const authorByID = authors.find((author) => author.id === id);
  return authorByID;
}

// Returns the book object that has the matching ID
function findBookById(books, id) {
  const bookByID = books.find((book) => book.id === id);
  return bookByID;
}

// Returns an array containing two arrays:
// First array contains book objects that represent books currently checked out. (returned: false)
// Second array contains book objects that represent books that have been returned. (returned: true)
function partitionBooksByBorrowedStatus(books) {
  const checkedOut =[];
  const returned = [];

  books.forEach((book) => {
    const borrows = book.borrows;
    // For each book, if the most recent borrow is marked as false, add to checked out array, otherwise to return array
    if (!borrows[0].returned){
      checkedOut.push(book);
    }
    else returned.push(book);
  });
  const partition = [];
  partition.push(checkedOut);
  partition.push(returned);

  return partition;
}

// Helper function to build account object with returned status below id
function buildAccountWithReturned(borrowDetails, account){
  const id = account.id;
  const returned = borrowDetails.returned;
  const picture = account.picture;
  const age = account.age;
  const name = account.name;
  const company = account.company;
  const email = account.email;
  const registered = account.registered;

  const accountWithReturned = { id, returned, picture, age, name, company, email, registered };
  return accountWithReturned;
}

// Returns an array of ten or fewer account objects that represents the accounts given by the IDs 
// in the provided book's `borrows` array.
// However, each account object should include the `returned` entry from the corresponding transaction object in the `borrows` array.
function getBorrowersForBook(book, accounts) {

  const accountBorrows = [];
  const borrows = book.borrows;

  for (let i = 0; i < borrows.length; i++) {
    if (i === 10) break;
    const account = accounts.find((acc) => acc.id === borrows[i].id);
    accountBorrows.push(buildAccountWithReturned(borrows[i], account));
  }
  return accountBorrows;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
