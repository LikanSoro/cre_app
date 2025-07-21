import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import supabase from '../lib/supabaseClient';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    supabase.auth.getSession().then(({data:{session}})=>{ if(session) router.push('/'); });
  }, [router]);
  async function handleLogin() {
    const {error} = await supabase.auth.signInWithPassword({email,password});
    if(!error) router.push('/');
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
        <input type="email" className="w-full mb-3 p-2 border rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
        <input type="password" className="w-full mb-3 p-2 border rounded" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
        <button onClick={handleLogin} className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded">Sign In</button>
      </div>
    </div>
  );
}