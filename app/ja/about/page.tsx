import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ACTIVE研究について',
  description: 'スピード処理トレーニングが20年間で認知症リスクを25%低下させることを実証したACTIVE研究の詳細。',
}

export default function JaAboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">ACTIVE研究について</h1>
      <div className="prose prose-gray max-w-none text-sm leading-relaxed space-y-4">
        <p><strong>ACTIVE（Advanced Cognitive Training for Independent and Vital Elderly）研究</strong>は、認知トレーニングと認知症予防に関して実施された世界最大かつ最長の無作為化対照試験です。</p>
        <p>米国国立衛生研究所（NIH）および国立老化研究所（NIA）の資金提供を受け、1998年から65歳以上の高齢者2,802名が参加しました。参加者はスピード処理訓練群、記憶力訓練群、推論力訓練群、対照群（訓練なし）の4グループにランダムに割り当てられました。</p>
        <h2 className="text-xl font-bold text-gray-900 mt-8">主要な発見：リスク25%低下</h2>
        <p>20年間の追跡調査の結果、統計的に有意な認知症診断リスクの低下を示したのは<strong>ブースターセッション付きのスピード処理トレーニング</strong>のみでした。アルツハイマー病を含む認知症のリスクが25%低下しました。</p>
        <p>記憶力トレーニングと推論力トレーニングには、長期的な保護効果は認められませんでした。また、ブースターセッションを受けなかったスピード処理訓練群にも有意な効果はなく、継続的な訓練の重要性が示されました。</p>
        <h2 className="text-xl font-bold text-gray-900 mt-8">なぜスピード処理トレーニングが有効なのか</h2>
        <p>スピード処理トレーニングは、基底核や広範な大脳皮質ネットワークを通じた<strong>暗黙的学習</strong>に依存します。これらの脳領域はアルツハイマー病の初期段階で比較的ダメージを受けにくい領域です。一方、記憶力トレーニングは海馬に依存しますが、海馬はアルツハイマー病で最初に影響を受ける領域です。</p>
        <p>適応型の設計により、脳は常に最適な負荷レベルで鍛えられ、<strong>神経可塑性</strong>が促進され、<strong>認知予備能</strong>が構築されます。</p>
        <h2 className="text-xl font-bold text-gray-900 mt-8">このツールについて</h2>
        <p>この無料ツールは、ACTIVE研究で使用されたUFOV（有効視野）トレーニングの手法に着想を得た教育的な実装です。医療機器や臨床介入ではありません。</p>
        <h2 className="text-xl font-bold text-gray-900 mt-8">参考文献</h2>
        <ul className="text-xs text-gray-500 space-y-1 list-none pl-0">
          <li>Edwards, J.D., et al. (2026). Impact of cognitive training on claims-based diagnosed dementia over 20 years: evidence from the ACTIVE study. Alzheimer&apos;s &amp; Dementia.</li>
          <li>Johns Hopkins Medicine. Cognitive Speed Training Linked to Lower Dementia Incidence Up To 20 Years Later.</li>
          <li>National Institutes of Health. Cognitive speed training over weeks may delay the diagnosis of dementia over decades.</li>
        </ul>
      </div>
    </div>
  )
}
