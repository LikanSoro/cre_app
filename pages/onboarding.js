import Link from 'next/link';
export default function Onboarding() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-4xl font-bold mb-6">Welcome to PropPulse AI</h1>
      <p className="mb-4 text-center">Underwrite any commercial real estate deal in 30 seconds.</p>
     <Link href="/login">
  <a className="btn btn-primary">Get Started</a>
</Link>

    </main>
  );
}