// src/pages/login.js
import { useState } from 'react';
import { supabase } from '../lib/db';

export default function Login() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // 1. Ask Supabase to send a magic link
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      setMessage('Error: ' + error.message);
    } else {
      setMessage('✅ Check your email for the login link!');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Join <span className="text-orange-600">JMT</span>
        </h1>

        {message ? (
          <div className="bg-green-100 text-green-700 p-4 rounded-lg text-center mb-4">
            {message}
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>
            <button
              disabled={loading}
              className="w-full bg-orange-600 text-white font-bold py-3 rounded-lg hover:bg-orange-700 transition disabled:opacity-50"
            >
              {loading ? 'Sending link...' : 'Send Magic Link'}
            </button>
          </form>
        )}
        
        <div className="mt-6 text-center">
            <a href="/" className="text-sm text-gray-400 hover:text-gray-600">Back to Home</a>
        </div>
      </div>
    </div>
  );
}