export const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const getFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

export const removeBook = (book, savedBooks, setSavedBooks) => {
    const updatedBooks = savedBooks.filter((savedBook) => savedBook.id !== book.id);
    saveToLocalStorage("savedBooks", updatedBooks);
    setSavedBooks(updatedBooks);
};

export const saveBook = (book, savedBooks, setSavedBooks) => {
    const newBooks = [...savedBooks, book];
    saveToLocalStorage("savedBooks", newBooks);
    setSavedBooks(newBooks)
}