// components/SummaryTab.js
import { useEffect, useState } from 'react'

export default function SummaryTab({ dealData }) {
  const [summary, setSummary] = useState('Generating summary…')
  const [error, setError]     = useState('')

  useEffect(() => {
    if (!dealData.t12 || !dealData.rentRoll) return

    const { t12, rentRoll } = dealData
    const prompt = `
You are a CRE underwriter assistant.
Summarize these key metrics from the T12 & rent roll in 2–3 sentences:
• Gross Potential Rent: ${t12.grossPotentialRent || 'N/A'}
• Operating Expenses: ${t12.operatingExpenses || 'N/A'}
• Vacancy Loss: ${t12.vacancyLoss || 'N/A'}
• Number of units: ${rentRoll.units?.length || 'N/A'}
    `.trim()

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/insights`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    })
      .then((r) => r.json())
      .then(({ answer, error: aiErr }) => {
        if (aiErr) {
          setError('AI summary failed.')
        } else {
          setSummary(answer)
        }
      })
      .catch(() => setError('AI summary failed.'))
  }, [dealData])

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-900">Deal Summary</h2>
      {error
        ? <p className="text-red-500">{error}</p>
        : <p className="text-gray-700 whitespace-pre-wrap">{summary}</p>
      }
    </div>
  )
}
