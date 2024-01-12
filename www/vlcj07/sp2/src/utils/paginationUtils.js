export const getCurrentBooks = (books, currentPage, booksPerPage) => {
    const lastBookIndex = currentPage * booksPerPage;
    const firstBookIndex = lastBookIndex - booksPerPage;
    return books.slice(firstBookIndex, lastBookIndex);
};