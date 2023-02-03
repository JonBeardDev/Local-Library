// Returns the account object that has the matching ID
function findAccountById(accounts, id) {
  const userAccount = accounts.find((account) => account.id === id);
  return userAccount;
}

// Returns a sorted array of the provided account objects, sorted by last name
function sortAccountsByLastName(accounts) {
  const sortedAccounts = accounts.sort((accountA, accountB) => 
    accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1);
  return sortedAccounts;
}

// Returns the borrows array from the given book object
function pullBorrowsArray(book) {
  const borrows = book.borrows;
  return borrows;
}

// Returns a number that represents the number of times the account's ID appears in any book's borrows array
function getTotalNumberOfBorrows(account, books) {
  let borrowCount = 0;

  books.forEach((book) => {
    const borrows = pullBorrowsArray(book);
    borrows.forEach((borrow) => {
      if (borrow.id === account.id) borrowCount ++;
    })
  })
  return borrowCount;
}

// Helper function to add author details to book object below authorId
function buildBookObjectWithAuthor(authors, book) {
  const id = book.id;
  const title = book.title;
  const genre = book.genre;
  const authorId = book.authorId;
  const author = authors.find((person) => person.id === authorId);
  const borrows = book.borrows;

  const bookWithAuthor = { id, title, genre, authorId, author, borrows };
  return bookWithAuthor;
}

// Returns an array of book objects, including author information, that represents all books currently checked out by the account
// Note author details should be nested into book details
function getBooksPossessedByAccount(account, books, authors) {
  const accountBooks = [];
  books.forEach((book) => {
    for (let i = 0; i < book.borrows.length; i++){
      // For each book, if there is a false returned value and ID matches the account ID, book to array
      if (book.borrows[i].id === account.id && !book.borrows[i].returned){
        accountBooks.push(book);
      }
    }
  });
  
  // Add author details to each book in the account's checked out array
  const accountBooksWithAuthor = [];
  accountBooks.forEach((book) => {
    const bookWithAuthor = buildBookObjectWithAuthor(authors, book);
    accountBooksWithAuthor.push(bookWithAuthor);
  })
  return accountBooksWithAuthor;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
