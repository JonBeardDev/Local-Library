// Returns a number that represents the number of book objects inside the books array
function getTotalBooksCount(books) {
  return books.length;
}

// Returns a number that represents the number of account objects inside the accounts array
function getTotalAccountsCount(accounts) {
  return accounts.length;
}

// Returns the borrows array from the given book object
function pullBorrowsArray(book) {
  const borrows = book.borrows;
  return borrows;
}

// Returns a number that represents the number of books currently checked out of the library (returned: false)
function getBooksBorrowedCount(books) {
  let borrowCount = 0;

  books.forEach((book) => {
    const borrows = pullBorrowsArray(book);
    borrows.forEach((borrow) => {
      if (!borrow.returned) borrowCount ++;
    })
  })
  return borrowCount;
}

// Returns an array containing five objects or fewer that represents the most common occurring genres, ordered from most common to least.
// Even if there is a tie, the array should only contain no more than five objects.
function getMostCommonGenres(books) {
  
  // Make array of each book's genre
  const genresArr = books.map((book) => book.genre);
  // Make object of genre (key) and count of that genre in genresArr (value)
  const genreOccurrences = genresArr.reduce((count, currentGenre) => { 
    return count[currentGenre] ? ++count[currentGenre] : count[currentGenre] = 1, count }, {});

  // Sort all genres by their count in new array
  const sortedGenres = Object.keys(genreOccurrences).sort((genreA, genreB) => genreOccurrences[genreB] - genreOccurrences[genreA]);
  
  let topFive = [];
  // For the first 5 elements in sorted array
  for (let i = 0; i < 5; i++) {
    const genre = sortedGenres[i];
    let genreCount = 0;
    // Find the count for that genre
    for (genreName in genreOccurrences) {
      if (genreName === genre) genreCount = genreOccurrences[genreName];
    }
    // Add the genre and count as an object to the topFive array
    const genreObject = { name: genre, count: genreCount}
    topFive.push(genreObject);
  }
  return topFive;
}

// Returns an array containing five objects or fewer that represents the most popular books in the library. 
// Popularity is represented by the number of times a book has been borrowed.
function getMostPopularBooks(books) {

  // Make array of book objects with just title and number of borrows
  const booksByBorrowedCount = [];
  books.forEach((book) => {
    const countObject = { name: book.title, count: book.borrows.length };
    booksByBorrowedCount.push(countObject);
  });

  // Sort array by borrow count (greatest first)
  const sortedBooks = booksByBorrowedCount.sort((bookA, bookB) => bookA.count > bookB.count ? -1 : 1);

  // Return top 5 books
  let topFive = []
  for (let i = 0; i < 5; i++) {
    topFive.push(sortedBooks[i]);
  }
  return topFive;
}

// Helper to get all authors and counts as objects in an array
function getAllAuthorCounts(books, authors){
  const allAuthorCounts = [];

  authors.forEach((author) => {
    // Build string for full name
    const authorName = `${author.name.first} ${author.name.last}`;
    let borrowsCount = 0;
    books.forEach((book) => {
      // For each book, if the authorId matches the current author, add the number of borrows to total count
      if (book.authorId === author.id){
        borrowsCount += book.borrows.length;
      }
    })
    
    // Build author name and count object and push to array
    const authorAndBorrowCount = { name: authorName, count: borrowsCount };
    allAuthorCounts.push(authorAndBorrowCount);
  })
  return allAuthorCounts;
}

// Returns an array containing five objects or fewer that represents the most popular authors whose books have been checked out the most. 
// Popularity is represented by finding all of the books written by the author 
// and then adding up the number of times those books have been borrowed.
function getMostPopularAuthors(books, authors) {
  const allAuthorCounts = getAllAuthorCounts(books, authors);

  // Sort authors by borrow count, greatest to least
  const sortedAuthors = allAuthorCounts.sort((authorA, authorB) => authorA.count > authorB.count ? -1 : 1);
  
  // Pull first 5 from sorted array
  let topFive = [];
  for (let i = 0; i < 5; i++) {
    topFive.push(sortedAuthors[i]);
  }
  return topFive;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
