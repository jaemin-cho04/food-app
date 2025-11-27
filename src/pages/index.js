// src/pages/index.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/db'; 
import FeedCard from '../components/FeedCard';
import FilterBar from '../components/FilterBar'; // <--- Import the new component

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // New State for Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('All');

  // 1. Fetch Data whenever Search or Category changes
  useEffect(() => {
    fetchRestaurants();
  }, [searchQuery, category]); // <--- Dependency Array: Re-run when these change

  async function fetchRestaurants() {
    setLoading(true);
    
    // Start the query
    let query = supabase
      .from('restaurants')
      .select('*')
      .order('id', { ascending: true });

    // Apply Filter: If category is NOT "All", filter by cuisine
    if (category !== 'All') {
      query = query.eq('cuisine', category);
    }

    // Apply Search: If user typed something, look for it in the name
    if (searchQuery) {
      query = query.ilike('name', `%${searchQuery}%`); // % means "anything before or after"
    }

    const { data, error } = await query;
    
    if (error) console.log('Error fetching:', error);
    else setRestaurants(data);
    
    setLoading(false);
  }

  const handleInteraction = async (id, type) => {
    // (This part is the same as before)
    const currentRestaurant = restaurants.find(r => r.id === id);
    let updates = {};

    if (type === 'like') updates = { likes: currentRestaurant.likes + 1 };
    if (type === 'double') updates = { double_likes: currentRestaurant.double_likes + 1 };
    if (type === 'dislike') updates = { dislikes: currentRestaurant.dislikes + 1 };

    setRestaurants(prev => prev.map(r => {
      if (r.id === id) return { ...r, ...updates };
      return r;
    }));

    await supabase.from('restaurants').update(updates).eq('id', id);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Head>
        <title>JMT - Real Food</title>
      </Head>

      {/* Header */}
      <div className="sticky top-0 z-50 bg-white pt-4 px-4 pb-2">
        <h1 className="text-2xl font-bold text-orange-600 tracking-tighter">
          JMT <span className="text-xs text-gray-500 font-normal ml-1">존맛탱</span>
        </h1>
      </div>

      {/* New Filter Bar */}
      <FilterBar 
        onSearch={setSearchQuery} 
        onCategoryChange={setCategory}
        activeCategory={category}
      />

      {/* Feed */}
      <main className="max-w-md mx-auto p-4 pt-0">
        {loading ? (
          <div className="text-center py-10 text-gray-400">Finding food...</div>
        ) : restaurants.length === 0 ? (
          <div className="text-center py-10 text-gray-400">No restaurants found! 🍜</div>
        ) : (
          restaurants.map(r => (
            <FeedCard 
              key={r.id} 
              restaurant={r} 
              onInteract={handleInteraction} 
            />
          ))
        )}
      </main>
    </div>
  );
}