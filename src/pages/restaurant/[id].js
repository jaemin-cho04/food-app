import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { supabase } from '../../lib/db';

export default function RestaurantProfile() {
  const router = useRouter();
  const { id } = router.query;
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchRestaurant();
  }, [id]);

  async function fetchRestaurant() {
    const { data, error } = await supabase
      .from('restaurants')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.log("Error fetching:", error);
    } else {
      setRestaurant(data);
    }
    setLoading(false);
  }

  if (loading) return <div className="p-10 text-center text-gray-500">Loading details...</div>;
  if (!restaurant) return <div className="p-10 text-center text-red-500">Restaurant not found!</div>;

  const netLikes = (restaurant.likes + restaurant.double_likes) - restaurant.dislikes;

  return (
    <div className="min-h-screen bg-white pb-10">
      <div className="fixed top-4 left-4 z-50">
        <Link href="/" className="bg-white/90 p-3 rounded-full shadow-lg backdrop-blur-md text-orange-600 font-bold hover:bg-orange-50 transition">
          ⬅️ Back
        </Link>
      </div>

      <div className="h-72 bg-gray-200 relative">
        <img
          src={restaurant.image}
          className="w-full h-full object-cover"
          alt={restaurant.name}
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 pt-20">
          <h1 className="text-3xl font-bold text-white mb-1">{restaurant.name}</h1>
          <p className="text-gray-300">{restaurant.district} • {restaurant.cuisine}</p>
        </div>
      </div>

      <div className="flex justify-around border-b py-4 bg-gray-50">
        <div className="text-center">
          <span className="block text-xl font-bold text-green-600">{netLikes}</span>
          <span className="text-xs text-gray-400">Net Likes</span>
        </div>
        <div className="text-center">
          <span className="block text-xl font-bold text-gray-800">{restaurant.visits}</span>
          <span className="text-xs text-gray-400">Visits</span>
        </div>
        <div className="text-center">
          <span className="block text-xl font-bold text-red-500">{restaurant.queue}m</span>
          <span className="text-xs text-gray-400">Wait Time</span>
        </div>
      </div>

      <div className="p-6 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-3">Menu Highlights</h2>
        {/* TODO: Replace with real menu data from DB */}
        <div className="space-y-3 text-gray-600">
          <div className="flex justify-between border-b pb-2">
            <span>Signature Dish</span>
            <span className="font-bold">$18</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span>Chef's Special</span>
            <span className="font-bold">$24</span>
          </div>
        </div>

        <button className="w-full mt-8 bg-orange-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg active:scale-95 transition">
          Join Waitlist
        </button>
      </div>
    </div>
  );
}
