// src/components/FilterBar.js
export default function FilterBar({ onSearch, onCategoryChange, activeCategory }) {
  const categories = ["All", "Korean", "Italian", "Cafe", "Western"];

  return (
    <div className="sticky top-14 z-40 bg-white shadow-sm pb-4 px-4 -mt-4 mb-4">
      {/* 1. Search Input */}
      <div className="relative mb-3">
        <input 
          type="text" 
          placeholder="Search 'Pasta' or 'Kimchi'..." 
          onChange={(e) => onSearch(e.target.value)}
          className="w-full bg-gray-100 rounded-lg py-3 px-10 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        {/* Simple search icon using text/emoji for now */}
        <span className="absolute left-3 top-3 text-gray-400">🔍</span>
      </div>

      {/* 2. Category Buttons (Scrollable) */}
      <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
        {categories.map((cat) => (
          <button 
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
              ${activeCategory === cat 
                ? 'bg-black text-white' 
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}