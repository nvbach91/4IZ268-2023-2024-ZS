import { useState } from "react"
import Modal from "./Modal"

export default function BookCard({ savedBooks, id, image, title, author, year, description, category, handleSave, handleRemove }) {

    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <div className="border border-black rounded-lg bg-slate-100 h-96 flex flex-col p-2 max-h-96" onClick={() => setModalOpen(true)}>
                <img src={image} alt={title} className="h-64 rounded-lg" />
                <h1 className="text-md font-bold overflow-auto">{title}</h1>
                <div className="flex-col overflow-auto">
                    <h2 className="text-sm">{author}</h2>
                    <h3 className="text-xs">{year.slice(0, 4)}</h3>
                </div>

            </div>
            {modalOpen &&
                <Modal
                    savedBooks={savedBooks}
                    setModalOpen={setModalOpen}
                    id={id}
                    title={title}
                    image={image}
                    author={author}
                    year={year}
                    description={description}
                    category={category}
                    handleSave={handleSave}
                    handleRemove={handleRemove}
                />
            }
        </>
    )
}