import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import supabase from '../lib/supabaseClient'
import Navbar from '../components/Navbar'
import { PlusIcon } from '@heroicons/react/24/outline'

export default function Dashboard() {
  const router = useRouter()
  const [authError, setAuthError] = useState('')
  const [deals, setDeals] = useState([])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) setAuthError(error.message)
      else if (!session) router.push('/login')
    })
  }, [router])

  // Load deals from localStorage after mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cre_deals') || '[]')
    setDeals(stored)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-100 to-white">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-10">
        {authError && (
          <div className="bg-red-100 text-red-800 p-4 rounded-md mb-6">
            {authError}
          </div>
        )}

        <header className="flex flex-col items-center justify-center mb-12 mt-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center">
            Welcome to Your CRE Analytics Dashboard
          </h1>
          <p className="text-lg text-gray-600 mt-3 text-center max-w-2xl">
            Submit and analyze new deals, track your underwriting pipeline, and make better decisions, faster.
          </p>
          <Link
            href="/new-deal"
            className="mt-8 inline-flex items-center gap-2 px-7 py-3 bg-indigo-600 hover:bg-indigo-700 transition rounded-xl text-white font-semibold text-lg shadow-lg"
          >
            <PlusIcon className="h-6 w-6" />
            New Deal
          </Link>
        </header>

        {deals.length === 0 ? (
          <section className="bg-white/80 p-8 rounded-2xl shadow-md flex flex-col items-center mt-4">
            <svg className="mb-4 h-16 w-16 text-indigo-100" fill="none" viewBox="0 0 64 64" stroke="currentColor" strokeWidth={2}>
              <rect x="12" y="18" width="40" height="28" rx="6" fill="#eef2ff" />
              <path d="M18 26h28M18 34h16" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2 text-center">No Deals Yet</h2>
            <p className="text-gray-500 text-center max-w-md mb-2">
              You haven&apos;t submitted any CRE deals yet. Click “New Deal” above to get started!
            </p>
          </section>
        ) : (
          <section className="bg-white/80 p-8 rounded-2xl shadow-md mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-5">Recent Deals</h2>
            <ul className="space-y-4">
              {deals.map((deal, idx) => (
                <li key={idx} className="p-4 rounded-lg border border-gray-100 bg-gray-50 hover:shadow-md transition">
                  <div className="font-semibold text-lg text-indigo-800">{deal.address}</div>
                  <div className="text-gray-700 text-sm">
                    Cap Rate: <b>{deal.model?.find(x=>x.line==='Cap Rate')?.value || '--'}</b>
                    &nbsp;| NOI: <b>{deal.model?.find(x=>x.line==='NOI')?.value || '--'}</b>
                  </div>
                  <div className="text-gray-500 text-xs mt-1">
                    Added: {deal.added ? new Date(deal.added).toLocaleString() : ''}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  )
}
