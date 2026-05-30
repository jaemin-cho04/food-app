export default function FilterBar({ onSearch, onCategoryChange, activeCategory }) {
  const categories = ["All", "Korean", "Italian", "Cafe", "Western", "Japanese"];

  return (
    <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-50 pb-4 pt-2">
      <div className="max-w-md mx-auto px-4">

        <div className="relative mb-4 group">
          <input
            type="text"
            placeholder="Search for 'Pasta'..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-gray-100 text-gray-800 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition-all shadow-sm group-hover:bg-white border border-transparent group-hover:border-gray-200"
          />
          <span className="absolute left-4 top-3.5 text-gray-400 text-lg">🔍</span>
        </div>

        <div className="flex gap-2 overflow-x-auto hide-scrollbar pl-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`
                px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 transform active:scale-95
                ${activeCategory === cat
                  ? 'bg-black text-white shadow-lg shadow-gray-200'
                  : 'bg-white border border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-800'
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
