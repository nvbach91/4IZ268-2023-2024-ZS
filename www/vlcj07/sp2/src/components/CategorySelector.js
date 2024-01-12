export default function CategorySelector({categories, selectedCategory, handleChangeCategory}) {
    return (
        <div className="flex gap-2 justify-between items-center shadow-sm">
            <label htmlFor="filter">Filter by category:</label>
            <select name="filter" id="filter" className="w-48 h-12 rounded-md hover:cursor-pointer" value={selectedCategory} onChange={handleChangeCategory}>
                <option value="all">All categories</option>
                {categories.map((category) => (
                    <option value={category} key={category}>{category}</option>
                ))}
            </select>
        </div>
    )
}
