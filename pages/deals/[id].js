// pages/deals/[id].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import supabase from '../../lib/supabaseClient';
import Navbar from '../../components/Navbar';
import ResultSummary from '../../components/ResultSummary';
import ChartWrapper from '../../components/ChartWrapper';

export default function DealDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) setAuthError(error.message);
      else if (!session) router.push('/login');
    });
  }, [router]);

  if (!id) return null;

  return (
    <div className="min-h-screen bg-surfaceDark">
      <Navbar />

      {authError && (
        <div className="bg-red-500 text-white p-2 rounded mb-4">
          {authError}
        </div>
      )}

      <main className="container mx-auto p-8 space-y-8">
        <h1 className="text-3xl font-semibold text-gray-100 mb-6">
          Deal Details: {id}
        </h1>

        <ResultSummary />
        <ChartWrapper />
      </main>
    </div>
  );
}
