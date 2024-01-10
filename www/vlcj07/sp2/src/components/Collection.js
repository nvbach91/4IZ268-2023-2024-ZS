import BookCard from "./BookCard"
import { getFromLocalStorage, removeBook } from "../utils/localStorage"
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { getCurrentBooks } from "../utils/paginationUtils";

export default function Collection({ savedBooks, setSavedBooks }) {

    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage, setBooksPerPage] = useState(4);

    useEffect(() => {
        const savedBooks = getFromLocalStorage("savedBooks");
        if (savedBooks) {
            setSavedBooks(savedBooks);
        }
    }, [setSavedBooks]);

    const handleRemove = (book) => {
        removeBook(book, savedBooks, setSavedBooks)
    }

    const currentBooks = getCurrentBooks(savedBooks, currentPage, booksPerPage);

    return (
        <div id="collection" className="flex flex-col widescreen:section-min-height tallscreen:section-min-height scroll-mt-20 p-6 my-12 gap-5">
            <h1 className="text-4xl font-semibold">Your collection</h1>
            {
                savedBooks.length === 0 ? (
                    <p className="text-lg">Your collection is empty. 😞</p>
                ) : (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {
                                currentBooks.map((book, i) => {
                                    return <BookCard
                                        savedBooks={savedBooks}
                                        id={book.id}
                                        image={book.image}
                                        title={book.title}
                                        author={book.author}
                                        year={book.year}
                                        description={book.description}
                                        category={book.category}
                                        key={i}
                                        handleRemove={handleRemove}
                                    />
                                })

                            }
                        </div>
                        <Pagination
                            totalBooks={savedBooks.length}
                            booksPerPage={booksPerPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </>
                )}

        </div>
    )
} 