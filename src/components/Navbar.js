import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-md mx-auto px-5 h-16 flex justify-between items-center">

        <Link href="/" className="group flex items-center gap-1">
          <span className="text-2xl font-black text-orange-600 tracking-tighter group-hover:scale-105 transition-transform">
            JMT
          </span>
          <span className="text-xs font-medium text-gray-400 mt-1.5 ml-0.5">존맛탱</span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1 bg-gray-50 border border-gray-100 rounded-full px-3 py-1.5 text-xs font-semibold text-gray-600">
            <span className="text-orange-500">📍</span> Seoul
          </div>

          <Link href="/profile" className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600 transition-all shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>

      </div>
    </nav>
  );
}
