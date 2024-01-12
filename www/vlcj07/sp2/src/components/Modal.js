export default function Modal({ savedBooks, setModalOpen, id, title, image, author, year, description, category, handleSave, handleRemove }) {

    const book = { id, image, title, author, year, description, category }

    const isInCollection = savedBooks.some(savedBook => savedBook.id === book.id)

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center" onClick={() => setModalOpen(false)}>
            <div className="bg-slate-100 p-2 w-full max-w-4xl rounded-lg overflow-y-auto max-h-screen" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between m-3 items-center">
                    <p className="text-2xl md:text-3xl font-bold">Book Detail</p>
                    <button className="border rounded-md py-2 px-3 shadow appearance-none font-semibold text-white bg-orange-300 md:max-w-xs hover:bg-orange-400 active:scale-90 hidden md:block" onClick={() => setModalOpen(false)}>Close</button>
                </div>
                <div className="flex flex-col md:flex-row m-3 gap-4 items-center">
                    <div className="flex flex-col gap-1 items-center">
                        <h1 className="text-xl md:text-2xl font-semibold">{title}</h1>
                        <h2 className="text-md md:texl-lg">{author}</h2>
                        <h3 className="text-sm md:text-md italic">{year.slice(0, 4)}</h3>
                        <h3 className="text-sm md:text-md italic">{category}</h3>
                        <img src={image} alt={title} className="w-40 md:w-60 rounded-lg" />
                    </div>
                    <div className="flex flex-col justify-evenly max-w-lg items-center">
                        <p className="text-sm md:text-base overflow-auto max-h-96">{description}</p>
                        <div className="flex gap-5 m-3">
                            <button className="md:hidden border rounded-md py-2 px-3 shadow appearance-none font-semibold text-white bg-orange-300 md:max-w-xs hover:bg-orange-400 active:scale-90" onClick={() => setModalOpen(false)}>Close</button>
                            {isInCollection ? (
                                <button className="border rounded-md py-2 px-3 shadow appearance-none font-semibold text-white bg-orange-300 md:max-w-xs hover:bg-orange-400 active:scale-90" onClick={() => handleRemove(book)}>Remove from my collection</button>
                            ) : (
                                <button className="border rounded-md py-2 px-3 shadow appearance-none font-semibold text-white bg-orange-300 md:max-w-xs hover:bg-orange-400 active:scale-90" onClick={() => handleSave(book)}>Add to my collection</button>
                            )}
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}