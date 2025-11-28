// src/pages/index.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/db'; 
import FeedCard from '../components/FeedCard';
import FilterBar from '../components/FilterBar'; 
import Navbar from '../components/Navbar'; // <--- Imported here

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    fetchRestaurants();
  }, [searchQuery, category]);

  async function fetchRestaurants() {
    setLoading(true);
    let query = supabase
      .from('restaurants')
      .select('*')
      .order('id', { ascending: true });

    if (category !== 'All') {
      query = query.eq('cuisine', category);
    }

    if (searchQuery) {
      query = query.ilike('name', `%${searchQuery}%`);
    }

    const { data, error } = await query;
    if (error) console.log('Error fetching:', error);
    else setRestaurants(data);
    setLoading(false);
  }

  const handleInteraction = async (id, type) => {
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

      {/* FIXED: We used the component instead of the old div */}
      <Navbar />

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