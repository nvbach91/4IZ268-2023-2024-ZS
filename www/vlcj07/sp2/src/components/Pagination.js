export default function Pagination({ totalBooks, booksPerPage, currentPage, setCurrentPage }) {

    let pages = [];

    for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
        pages.push(i)
    }

    return (
        <div className="flex justify-center m-2 gap-1">
            {pages.map((page, index) => {
                return (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 border rounded-md ${currentPage === page ? "bg-orange-500" : "bg-orange-300"} text-white hover:bg-orange-400 active:scale-90 font-semibold text-lg shadow appearance-none`}
                    >{page}</button>
                )
            })}
        </div>
    )
}
