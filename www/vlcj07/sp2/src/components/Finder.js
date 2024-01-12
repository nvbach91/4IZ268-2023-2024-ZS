import SearchBar from "./SearchBar"
import BookArea from "./BookArea"
import { useState } from "react"
import axios from "axios"
import { removeBook, saveBook } from "../utils/localStorage"
import Spinner from "./Spinner"
import {customAlphabet} from "nanoid"

const nanoid = customAlphabet('1234567890', 12);

export default function Finder({ savedBooks, setSavedBooks }) {

    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");
    const [inputValue, setInputValue] = useState("");

    const [err, setErr] = useState("");

    const [loading, setLoading] = useState(false);

    const APIKey = "AIzaSyBRQ7Gp4PMOweZXeHuAlWXCWfgNft82PM8";

    const searchBook = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErr("");
        try {
            const response = await axios.get("https://www.googleapis.com/books/v1/volumes", {
                params: { q: search, key: APIKey, maxResults: 20 }
            });
            setBooks(cleanData(response.data).sort((a,b) => {
                return a.volumeInfo.title.localeCompare(b.volumeInfo.title)
            }));
        } catch (error) {
            console.error("Error:", error);
            setErr(error);
            setBooks([]);
        }
        setLoading(false);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value.replace(/\s+/g, " ").trim())
        setInputValue(e.target.value)
    }

    const handleSave = (book) => {
        saveBook(book, savedBooks, setSavedBooks)
    }

    const handleRemove = (book) => {
        removeBook(book, savedBooks, setSavedBooks)
    }

    const handleClear = () => {
        setSearch("");
        setBooks([]);
        setInputValue("");
        setErr("");
    }

    const cleanData = (data) => {
        return data.items.map((book) => {
            if (!book.id) {
                book.id = nanoid();
            }
            if (!book.volumeInfo.publishedDate) {
                book.volumeInfo.publishedDate = "0000";
            }
            if (!book.volumeInfo.imageLinks) {
                book.volumeInfo.imageLinks = { thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019" };
            }
            if (!book.volumeInfo.authors) {
                book.volumeInfo.authors = ["No Name"];
            }
            if (!book.volumeInfo.title) {
                book.volumeInfo.title = "No Title";
            }
            if (!book.volumeInfo.description) {
                book.volumeInfo.description = "No Description";
            }
            if (!book.volumeInfo.categories) {
                book.volumeInfo.categories = ["No Category"];
            }
            return book;
        });
    };

    return (
        <div id="finder" className="flex flex-col widescreen:section-min-height tallscreen:section-min-height scroll-mt-20 p-6 my-12 gap-5">
            <h1 className="text-4xl font-semibold">Find your new book</h1>
            <SearchBar searchBook={searchBook} handleSearch={handleSearch} handleClear={handleClear} inputValue={inputValue} />
            {loading && <Spinner />}
            {err && <p>Searching error. Try later or something different.</p>}
            <BookArea savedBooks={savedBooks} books={books} handleSave={handleSave} handleRemove={handleRemove} />
        </div>
    )
} 