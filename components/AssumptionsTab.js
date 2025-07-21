// components/AssumptionsTab.js
import { useEffect, useState } from 'react'

export default function AssumptionsTab({ geo, crimeRate }) {
  const [assumptions, setAssumptions] = useState('Generating assumptions…')
  const [error, setError]             = useState('')

  useEffect(() => {
    if (!geo?.address?.city) return

    const prompt = `
You are a CRE underwriting assistant.
Based on location ${geo.address.city}, ${geo.address.state} and crime rate index ${crimeRate || 'N/A'},
propose two vacancy rate assumptions (as percentages) with a brief rationale.
    `.trim()

    fetch('/insights', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    })
      .then((r) => r.json())
      .then(({ answer, error: aiErr }) => {
        if (aiErr) setError('AI assumptions failed.')
        else setAssumptions(answer)
      })
      .catch(() => setError('AI assumptions failed.'))
  }, [geo, crimeRate])

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-900">Assumptions</h2>
      {error
        ? <p className="text-red-500">{error}</p>
        : <pre className="text-gray-700 whitespace-pre-wrap">{assumptions}</pre>
      }
    </div>
  )
}
