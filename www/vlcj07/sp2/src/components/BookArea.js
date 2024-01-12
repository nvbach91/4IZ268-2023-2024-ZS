import BookCard from "./BookCard"
import { getCurrentBooks } from "../utils/paginationUtils";
import { useState } from "react";
import Pagination from "./Pagination";

export default function BookArea({ savedBooks, books, handleSave, handleRemove }) {

    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage, setBooksPerPage] = useState(4);

    const currentBooks = getCurrentBooks(books, currentPage, booksPerPage);

    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                    currentBooks.map((book) => {
                        return <BookCard
                            savedBooks={savedBooks}
                            id={book.id}
                            image={book.volumeInfo.imageLinks.thumbnail}
                            title={book.volumeInfo.title}
                            author={book.volumeInfo.authors}
                            year={book.volumeInfo.publishedDate}
                            description={book.volumeInfo.description}
                            category={book.volumeInfo.categories}
                            key={book.id}
                            handleSave={handleSave}
                            handleRemove={handleRemove}
                        />
                    })
                }
            </div>

            <Pagination
                totalBooks={books.length}
                booksPerPage={booksPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </>
    )
}