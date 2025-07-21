// components/Navbar.js
import { useState } from 'react'
import { useRouter } from 'next/router'
import supabase from '../lib/supabaseClient'

export default function Navbar() {
  const router = useRouter()
  const [authError, setAuthError] = useState(null)

  // if on login page, just show title
  const isLoginPage = router.pathname === '/login'

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error && error.message !== 'Session from session_id claim in JWT does not exist') {
      setAuthError(error.message)
      return
    }
    router.push('/login')
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
        <h1 className="text-2xl font-semibold text-gray-800">CRE Analytics</h1>

        {/* if not on login page, show logout and any errors */}
        {!isLoginPage && (
          <div className="flex items-center space-x-4">
            {authError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-1 rounded-md text-sm">
                {authError}
              </div>
            )}
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md px-2 py-1 transition font-medium"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
