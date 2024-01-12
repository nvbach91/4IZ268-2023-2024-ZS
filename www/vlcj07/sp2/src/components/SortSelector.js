export default function SortSelector({ handleSort }) {
  return (
    <div className="flex gap-2 justify-between items-center shadow-sm">
      <label htmlFor="sort">Sort by:</label>
      <select name="sort" id="sort" className="w-48 h-12 rounded-md hover:cursor-pointer" onChange={handleSort}>
        <option value="titleA">Title A-Z</option>
        <option value="titleZ">Title Z-A</option>
        <option value="newest">Date Newest</option>
        <option value="oldest">Date Oldest</option>
      </select>
    </div>
  )
}