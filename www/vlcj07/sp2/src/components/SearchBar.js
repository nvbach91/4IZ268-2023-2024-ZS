export default function SearchBar({ handleSearch, searchBook, handleClear, inputValue }) {

    return (
        <>
            <form className="flex gap-1" onSubmit={searchBook}>
                <input id="search-input" onChange={handleSearch} value={inputValue} type="text" className="w-full h-20 text-2xl shadow appearance-none border py-2 px-3 rounded-md" placeholder="e.g. Frankenstein" />
                <button type="submit" className="bg-orange-300 text-white h-20 w-32 rounded-md font-semibold text-2xl py-2 px-3 shadow appearance-none border hover:bg-orange-400 active:scale-90">Find</button>
                {inputValue && (
                    <button onClick={handleClear} className="bg-orange-300 text-white h-20 w-32 rounded-md font-semibold text-2xl py-2 px-3 shadow appearance-none border hover:bg-orange-400 active:scale-90">Clear</button>
                )}
            </form>
        </>
    )
}