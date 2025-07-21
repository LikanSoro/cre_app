// components/BuyBoxTab.js
import { useEffect, useState } from 'react'

export default function BuyBoxTab({ dealMetrics, criteria }) {
  const [feedback, setFeedback] = useState('Evaluating deal against buy‑box…')
  const [error, setError]       = useState('')

  useEffect(() => {
    if (!dealMetrics?.irr || !criteria?.irr) return

    const prompt = `
You are a CRE underwriting assistant.
Deal IRR: ${dealMetrics.irr}% (target ${criteria.irr}%).
Explain in bullet points why it does or does not meet the target IRR,
and suggest two concrete actions to hit the target IRR.
    `.trim()

    fetch('/insights', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    })
      .then((r) => r.json())
      .then(({ answer, error: aiErr }) => {
        if (aiErr) setError('AI buy‑box evaluation failed.')
        else setFeedback(answer)
      })
      .catch(() => setError('AI buy‑box evaluation failed.'))
  }, [dealMetrics, criteria])

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-900">Buy Box Feedback</h2>
      {error
        ? <p className="text-red-500">{error}</p>
        : <pre className="text-gray-700 whitespace-pre-wrap">{feedback}</pre>
      }
    </div>
  )
}
