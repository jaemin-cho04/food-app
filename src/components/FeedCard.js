import Link from 'next/link';
import { calculateNetLikes, formatWaitTime } from '../lib/algo';

export default function FeedCard({ restaurant, onInteract }) {
  const netLikes = calculateNetLikes(restaurant);
  
  // Color logic
  const isHighParams = netLikes > 100;
  const scoreColor = isHighParams ? 'text-orange-600' : 'text-gray-900';
  const badgeColor = isHighParams ? 'bg-orange-50 border-orange-100 text-orange-700' : 'bg-gray-50 border-gray-100 text-gray-600';

  return (
    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-gray-100 mb-8 hover:shadow-lg transition-shadow duration-300">
      
      {/* 1. Image Area (Clickable) */}
      <Link href={`/restaurant/${restaurant.id}`}>
        <div className="relative h-64 bg-gray-100 cursor-pointer group overflow-hidden">
          <img 
            src={restaurant.image} 
            alt={restaurant.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-in-out" 
          />
          
          {/* Floating Badge: Wait Time */}
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
            <span>🕒</span> {formatWaitTime(restaurant.queue)}
          </div>

          {/* Floating Badge: Net Likes Score */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-gray-900 text-sm font-black px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
            <span className={netLikes > 50 ? 'text-orange-500' : 'text-gray-400'}>★</span> {netLikes}
          </div>

          {/* Gradient Overlay at bottom for text readability */}
          <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-80 transition"></div>
        </div>
      </Link>

      {/* 2. Content Area */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-xl text-gray-900 leading-tight mb-1">{restaurant.name}</h3>
            <p className="text-sm font-medium text-gray-400 flex items-center gap-2">
              <span className="uppercase tracking-wider text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-500">{restaurant.cuisine}</span> 
              • {restaurant.district}
            </p>
          </div>
        </div>

        {/* 3. Action Buttons (Clean & Modern) */}
        <div className="flex gap-2 pt-2">
          <button 
            onClick={() => onInteract(restaurant.id, 'like')}
            className="flex-1 py-3 bg-gray-50 hover:bg-blue-50 text-gray-500 hover:text-blue-600 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 group"
          >
            <span className="group-hover:scale-110 transition">👍</span> Like
          </button>
          
          <button 
            onClick={() => onInteract(restaurant.id, 'double')}
            className="flex-1 py-3 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-xl font-black text-sm transition-colors flex items-center justify-center gap-2 group border border-orange-100"
          >
            <span className="group-hover:scale-125 transition">❤️</span> Luv It
          </button>
          
          <button 
            onClick={() => onInteract(restaurant.id, 'dislike')}
            className="flex-1 py-3 bg-gray-50 hover:bg-gray-200 text-gray-400 hover:text-gray-600 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2"
          >
            👎 Nah
          </button>
        </div>
      </div>
    </div>
  );
}