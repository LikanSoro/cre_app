// components/Navbar.js
import { useRouter } from 'next/router'
import supabase from '../lib/supabaseClient'

export default function Navbar() {
  const router = useRouter()
  const isLoginPage = router.pathname === '/login'

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
    } catch (_err) {
      // ignore any errors (including "Auth session missing!")
    }
    router.push('/login')
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
        <h1 className="text-2xl font-semibold text-gray-800">CRE Analytics</h1>
        {!isLoginPage && (
          <button
            onClick={handleLogout}
            className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md px-2 py-1 transition font-medium"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  )
}
