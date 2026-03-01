import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About the ACTIVE Study Research',
  description: 'Learn about the landmark ACTIVE study that demonstrated how speed-of-processing training can reduce dementia risk by 25% over 20 years.',
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About the Research</h1>
      <div className="prose prose-gray max-w-none text-sm leading-relaxed space-y-4">
        <p>The <strong>ACTIVE (Advanced Cognitive Training for Independent and Vital Elderly) study</strong> is the largest and longest randomized controlled trial ever conducted on cognitive training and dementia prevention.</p>
        <p>Funded by the U.S. National Institutes of Health (NIH) and the National Institute on Aging (NIA), the study enrolled 2,802 adults aged 65 and older starting in 1998. Participants were randomly assigned to one of four groups: speed-of-processing training, memory training, reasoning training, or a no-training control group.</p>
        <h2 className="text-xl font-bold text-gray-900 mt-8">Key Finding: 25% Risk Reduction</h2>
        <p>After 20 years of follow-up, only one intervention showed a statistically significant reduction in dementia diagnosis: <strong>speed-of-processing training combined with booster sessions</strong> reduced the risk of Alzheimer&apos;s disease and related dementias by 25%.</p>
        <p>Neither memory training nor reasoning training showed significant long-term protective effects. Crucially, the speed training group that did not receive booster sessions also showed no significant benefit, highlighting the importance of continued practice.</p>
        <h2 className="text-xl font-bold text-gray-900 mt-8">Why Speed Training Works</h2>
        <p>Speed-of-processing training targets <strong>implicit learning</strong> through the basal ganglia and broad cortical networks &mdash; brain regions that are relatively resistant to early Alzheimer&apos;s pathology. In contrast, memory training relies on the hippocampus, which is among the first areas damaged by the disease.</p>
        <p>The adaptive nature of the training keeps the brain working at its optimal challenge level, promoting <strong>neuroplasticity</strong> and building <strong>cognitive reserve</strong>.</p>
        <h2 className="text-xl font-bold text-gray-900 mt-8">About This Tool</h2>
        <p>This free tool is inspired by the UFOV (Useful Field of View) training paradigm used in the ACTIVE study. It is an educational implementation and is not a medical device or clinical intervention.</p>
        <h2 className="text-xl font-bold text-gray-900 mt-8">References</h2>
        <ul className="text-xs text-gray-500 space-y-1 list-none pl-0">
          <li>Edwards, J.D., et al. (2026). Impact of cognitive training on claims-based diagnosed dementia over 20 years: evidence from the ACTIVE study. <em>Alzheimer&apos;s &amp; Dementia</em>.</li>
          <li>Johns Hopkins Medicine. Cognitive Speed Training Linked to Lower Dementia Incidence Up To 20 Years Later.</li>
          <li>National Institutes of Health. Cognitive speed training over weeks may delay the diagnosis of dementia over decades.</li>
        </ul>
      </div>
    </div>
  )
}
