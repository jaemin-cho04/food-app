// src/components/FeedCard.js
import Link from 'next/link'; // <--- THIS IS THE MISSING KEY
import { calculateNetLikes, formatWaitTime } from '../lib/algo';

export default function FeedCard({ restaurant, onInteract }) {
  const netLikes = calculateNetLikes(restaurant);
  const scoreColor = netLikes > 100 ? 'text-green-600' : (netLikes > 50 ? 'text-orange-500' : 'text-gray-500');

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 mb-6">
      
      {/* WRAPPING THE IMAGE IN A LINK */}
      <Link href={`/restaurant/${restaurant.id}`}>
        <div className="relative h-48 bg-gray-200 cursor-pointer group">
          <img 
            src={restaurant.image} 
            alt={restaurant.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
          />
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
            {formatWaitTime(restaurant.queue)}
          </div>
        </div>
      </Link>

      <div className="p-3">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg text-black">{restaurant.name}</h3>
          <div className="text-right">
            <span className={`text-2xl font-black ${scoreColor}`}>{netLikes}</span>
            <p className="text-xs text-gray-400">Net Likes</p>
          </div>
        </div>

        <div className="flex gap-4 mt-3 border-t pt-3">
          <button onClick={() => onInteract(restaurant.id, 'like')} className="flex-1 text-gray-500 hover:text-blue-500 text-sm">👍 Like</button>
          <button onClick={() => onInteract(restaurant.id, 'double')} className="flex-1 text-gray-500 hover:text-red-500 text-sm font-bold">❤️ Luv It</button>
          <button onClick={() => onInteract(restaurant.id, 'dislike')} className="flex-1 text-gray-500 hover:text-gray-700 text-sm">👎 Nah</button>
        </div>
      </div>
    </div>
  );
}