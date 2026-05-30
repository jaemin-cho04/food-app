import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { supabase } from '../lib/db';

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      setUser(user);
    } else {
      router.push('/login');
    }
    setLoading(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/login');
  }

  if (loading) return <div className="p-10 text-center">Loading profile...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-6 shadow-sm mb-6">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <p className="text-gray-500 text-sm">Manage your account</p>
      </div>

      <div className="max-w-md mx-auto px-4 space-y-4">
        <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-2xl">
            👤
          </div>
          <div>
            <p className="text-sm text-gray-400">Signed in as</p>
            <p className="font-bold text-lg">{user.email}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center cursor-pointer hover:bg-gray-50">
            <span>❤️ My Liked Restaurants</span>
            <span>👉</span>
          </div>
          <div className="p-4 border-b flex justify-between items-center cursor-pointer hover:bg-gray-50">
            <span>📝 My Reviews</span>
            <span>👉</span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-white border border-red-100 text-red-500 font-bold py-3 rounded-xl shadow-sm hover:bg-red-50"
        >
          Sign Out
        </button>

        <div className="text-center mt-4">
          <Link href="/" className="text-gray-400 text-sm">Back to Feed</Link>
        </div>
      </div>
    </div>
  );
}
