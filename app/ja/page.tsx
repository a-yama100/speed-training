"use client"
import SpeedTraining from '@/components/SpeedTraining'

export default function JaHomePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-6">
        <p className="text-sm text-blue-600 font-medium mb-1">ACTIVE研究に基づく</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">スピード処理トレーニング</h1>
        <p className="text-gray-500 text-sm max-w-lg mx-auto">
          20年間の追跡調査で認知症リスク25%低下を実証した研究に基づく、適応型の視覚的注意力トレーニングです。
        </p>
      </div>
      <SpeedTraining lang="ja" />
      <div className="mt-10 bg-white rounded-xl border border-gray-200 p-6 text-sm text-gray-600 space-y-3">
        <h2 className="font-bold text-gray-900 text-base">トレーニングの仕組み</h2>
        <p>このトレーニングは、中央のオブジェクトを識別しながら周辺のターゲットを追跡する<strong>分割的注意</strong>と<strong>情報処理速度</strong>を鍛えます。ACTIVE研究のスピード処理介入と同じ認知的要求に基づいています。</p>
        <p>難易度はリアルタイムで適応します。正解が続くと表示時間が短縮され、視覚的な妨害刺激が増加し、ターゲットがより周辺に移動します。常に最適な負荷レベルで脳を鍛え続けます。</p>
        <p className="text-xs text-gray-400">これは公開された研究に基づく無料の教育ツールです。医療機器や臨床介入ではありません。医学的なアドバイスについては医療専門家にご相談ください。</p>
      </div>
    </div>
  )
}
