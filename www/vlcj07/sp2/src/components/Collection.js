import BookCard from "./BookCard"
import { getFromLocalStorage, removeBook } from "../utils/localStorage"
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { getCurrentBooks } from "../utils/paginationUtils";
import SortSelector from "./SortSelector";
import CategorySelector from "./CategorySelector";

export default function Collection({ savedBooks, setSavedBooks }) {

    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage, setBooksPerPage] = useState(4);

    const [sortCriteria, setSortCriteria] = useState("titleA");

    const [selectedCategory, setSelectedCategory] = useState("all");

    useEffect(() => {
        const savedBooks = getFromLocalStorage("savedBooks");
        if (!savedBooks) {
            setSavedBooks([])
        } else {
            setSavedBooks(savedBooks)
        }
    }, []);

    const handleRemove = (book) => {
        removeBook(book, savedBooks, setSavedBooks)
    }

    const handleSort = (e) => {
        setSortCriteria(e.target.value);
    };

    const categories = [...new Set(savedBooks.map((book) => book.category[0]))]

    // console.log(categories)

    const filteredBooks = savedBooks.filter((book) => {
        return selectedCategory === "all" || selectedCategory === book.category[0]
    })

    const handleChangeCategory = (e) => {
        setSelectedCategory(e.target.value)
    }

    const sortedBooks = filteredBooks.sort((a, b) => {
        switch (sortCriteria) {
            case "titleA":
                return a.title.localeCompare(b.title);
            case "titleZ":
                return b.title.localeCompare(a.title);
            case "newest":
                return b.year.localeCompare(a.year);
            case "oldest":
                return a.year.localeCompare(b.year);
            default:
                return 0;
        }
    });

    const currentBooks = getCurrentBooks(sortedBooks, currentPage, booksPerPage);

    return (
        <div id="collection" className="flex flex-col widescreen:section-min-height tallscreen:section-min-height scroll-mt-20 p-6 my-12 gap-5">
            <h1 className="text-4xl font-semibold">Your collection</h1>
            {
                savedBooks.length === 0 ? (
                    <p className="text-lg">Your collection is empty. 😞</p>
                ) : (
                    <>
                        <div className="flex flex-col md:flex-row justify-between md:justify-evenly gap-5">
                            <SortSelector handleSort={handleSort} />
                            <CategorySelector categories={categories} selectedCategory={selectedCategory} handleChangeCategory={handleChangeCategory} />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {
                                currentBooks.map((book) => {
                                    return <BookCard
                                        savedBooks={savedBooks}
                                        id={book.id}
                                        image={book.image}
                                        title={book.title}
                                        author={book.author}
                                        year={book.year}
                                        description={book.description}
                                        category={book.category}
                                        key={book.id}
                                        handleRemove={handleRemove}
                                    />
                                })

                            }
                        </div>
                        <Pagination
                            totalBooks={filteredBooks.length}
                            booksPerPage={booksPerPage}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </>
                )}

        </div>
    )
} 