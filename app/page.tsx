"use client"
import SpeedTraining from '@/components/SpeedTraining'

export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-6">
        <p className="text-sm text-blue-600 font-medium mb-1">Based on the ACTIVE Study</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Speed Processing Training</h1>
        <p className="text-gray-500 text-sm max-w-lg mx-auto">
          Adaptive visual attention training inspired by the research that showed a 25% reduction in dementia risk over 20 years.
        </p>
      </div>
      <SpeedTraining lang="en" />
      <div className="mt-10 bg-white rounded-xl border border-gray-200 p-6 text-sm text-gray-600 space-y-3">
        <h2 className="font-bold text-gray-900 text-base">How This Works</h2>
        <p>This training exercises your <strong>divided attention</strong> and <strong>processing speed</strong> by asking you to identify a central object while tracking a peripheral target &mdash; the same cognitive demands used in the ACTIVE study&apos;s speed-of-processing intervention.</p>
        <p>The difficulty adapts in real time: correct answers shorten display time, add visual distractors, and push targets further into your peripheral vision. This keeps your brain working at its optimal challenge level.</p>
        <p className="text-xs text-gray-400">This is a free educational tool inspired by published research. It is not a medical device or clinical intervention. Consult your healthcare provider for medical advice.</p>
      </div>
    </div>
  )
}
