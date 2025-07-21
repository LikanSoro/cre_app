import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import supabase from '../lib/supabaseClient'
import Navbar from '../components/Navbar'
import Stepper from '../components/Stepper'
import AddressAutocomplete from '../components/AddressAutocomplete'
import FileUpload from '../components/FileUpload'
import ModelTabs from '../components/ModelTabs'
import CriteriaForm from '../components/CriteriaForm'

export default function NewDeal() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [dealData, setDealData] = useState({})
  const [error, setError] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) setError(error.message)
      else if (!session) router.push('/login')
    })
  }, [router])

  const labels = ['Address', 'Upload', 'Model', 'Criteria']

  const next = (data) => {
    setDealData(d => ({ ...d, ...data }))
    setStep(s => s + 1)
  }

  const handleDealComplete = (deal) => {
    const prev = JSON.parse(localStorage.getItem('cre_deals') || '[]')
    prev.unshift(deal) // most recent first
    localStorage.setItem('cre_deals', JSON.stringify(prev))
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        {error && (
          <div className="bg-red-500 text-white p-3 rounded">
            {error}
          </div>
        )}
        <h1 className="text-4xl font-bold text-gray-800">
          New Deal Wizard
        </h1>
        <Stepper labels={labels} currentStep={step} />
        <div className="mt-6">
          {step === 1 && (
            <AddressAutocomplete onNext={address => next({ address })} />
          )}
          {step === 2 && (
            <FileUpload onNext={({ t12File, rentRollFile }) => next({ t12File, rentRollFile })} />
          )}
          {step === 3 && (
            <ModelTabs dealData={dealData} onComplete={handleDealComplete} />
          )}
          {step === 4 && (
            <CriteriaForm dealData={dealData} />
          )}
        </div>
      </div>
    </div>
  )
}
