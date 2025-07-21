// components/Navbar.js

import { useRouter } from 'next/router';
import Link from 'next/link';
import supabase from '../lib/supabaseClient';

export default function Navbar() {
  const router = useRouter();

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-brand">
          CRE Underwriting
        </Link>
        <button
          onClick={signOut}
          className="text-sm text-red-600 hover:text-red-800"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}
