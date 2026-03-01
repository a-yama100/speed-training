"use client"
import { useState, useEffect, useCallback, useRef } from 'react'

type Phase = 'ready' | 'fixation' | 'stimulus' | 'respond' | 'feedback' | 'results'
type CenterShape = 'car' | 'truck'
type PeripheralPos = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

interface Trial {
  centerShape: CenterShape
  peripheralPos: PeripheralPos
  displayMs: number
  distractors: number
  responded: boolean
  centerCorrect: boolean
  peripheralCorrect: boolean
  reactionMs: number
}

interface Props {
  lang: 'en' | 'ja'
}

const PERIPHERAL_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315]
const PERIPHERAL_LABELS_EN = ['Right', 'Lower-Right', 'Down', 'Lower-Left', 'Left', 'Upper-Left', 'Up', 'Upper-Right']
const PERIPHERAL_LABELS_JA = ['右', '右下', '下', '左下', '左', '左上', '上', '右上']
const TOTAL_TRIALS = 20
const INITIAL_DISPLAY_MS = 500
const MIN_DISPLAY_MS = 50
const FIXATION_MS = 500
const FEEDBACK_MS = 1200

export default function SpeedTraining({ lang }: Props) {
  const isJa = lang === 'ja'
  const [phase, setPhase] = useState<Phase>('ready')
  const [trialIndex, setTrialIndex] = useState(0)
  const [displayMs, setDisplayMs] = useState(INITIAL_DISPLAY_MS)
  const [distractors, setDistractors] = useState(0)
  const [currentCenter, setCurrentCenter] = useState<CenterShape>('car')
  const [currentPeripheral, setCurrentPeripheral] = useState<PeripheralPos>(0)
  const [distractorPositions, setDistractorPositions] = useState<number[]>([])
  const [peripheralRadius, setPeripheralRadius] = useState(120)
  const [selectedCenter, setSelectedCenter] = useState<CenterShape | null>(null)
  const [selectedPeripheral, setSelectedPeripheral] = useState<PeripheralPos | null>(null)
  const [answerStep, setAnswerStep] = useState<'center' | 'peripheral'>('center')
  const [trials, setTrials] = useState<Trial[]>([])
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null)
  const stimulusTime = useRef(0)
  const [level, setLevel] = useState(1)
  const [streak, setStreak] = useState(0)

  const startSession = useCallback(() => {
    setTrials([])
    setTrialIndex(0)
    setDisplayMs(INITIAL_DISPLAY_MS)
    setDistractors(0)
    setPeripheralRadius(120)
    setLevel(1)
    setStreak(0)
    setPhase('fixation')
  }, [])

  const generateTrial = useCallback(() => {
    const center: CenterShape = Math.random() > 0.5 ? 'car' : 'truck'
    const pos = Math.floor(Math.random() * 8) as PeripheralPos
    setCurrentCenter(center)
    setCurrentPeripheral(pos)

    const dPos: number[] = []
    if (distractors > 0) {
      const available = [0,1,2,3,4,5,6,7].filter(p => p !== pos)
      for (let i = 0; i < Math.min(distractors, available.length); i++) {
        const idx = Math.floor(Math.random() * available.length)
        dPos.push(available.splice(idx, 1)[0])
      }
    }
    setDistractorPositions(dPos)
  }, [distractors])

  useEffect(() => {
    if (phase === 'fixation') {
      generateTrial()
      const t = setTimeout(() => {
        setPhase('stimulus')
        stimulusTime.current = performance.now()
      }, FIXATION_MS)
      return () => clearTimeout(t)
    }
  }, [phase, generateTrial])

  useEffect(() => {
    if (phase === 'stimulus') {
      const t = setTimeout(() => {
        setPhase('respond')
        setAnswerStep('center')
        setSelectedCenter(null)
        setSelectedPeripheral(null)
      }, displayMs)
      return () => clearTimeout(t)
    }
  }, [phase, displayMs])

  const submitAnswer = useCallback(() => {
    if (selectedCenter === null || selectedPeripheral === null) return
    const reactionMs = performance.now() - stimulusTime.current
    const centerOk = selectedCenter === currentCenter
    const periOk = selectedPeripheral === currentPeripheral
    const bothOk = centerOk && periOk

    const trial: Trial = {
      centerShape: currentCenter,
      peripheralPos: currentPeripheral,
      displayMs,
      distractors,
      responded: true,
      centerCorrect: centerOk,
      peripheralCorrect: periOk,
      reactionMs,
    }
    setTrials(prev => [...prev, trial])
    setLastCorrect(bothOk)

    if (bothOk) {
      const newStreak = streak + 1
      setStreak(newStreak)
      if (newStreak % 3 === 0) {
        setDisplayMs(prev => Math.max(MIN_DISPLAY_MS, prev - 40))
        if (newStreak % 6 === 0 && distractors < 7) {
          setDistractors(prev => prev + 1)
        }
        if (newStreak % 9 === 0) {
          setPeripheralRadius(prev => Math.min(200, prev + 15))
        }
        setLevel(prev => prev + 1)
      }
    } else {
      setStreak(0)
      setDisplayMs(prev => Math.min(INITIAL_DISPLAY_MS, prev + 30))
      if (distractors > 0 && Math.random() > 0.5) {
        setDistractors(prev => Math.max(0, prev - 1))
      }
    }

    setPhase('feedback')
  }, [selectedCenter, selectedPeripheral, currentCenter, currentPeripheral, displayMs, distractors, streak])

  useEffect(() => {
    if (phase === 'feedback') {
      const next = trialIndex + 1
      const t = setTimeout(() => {
        if (next >= TOTAL_TRIALS) {
          setPhase('results')
        } else {
          setTrialIndex(next)
          setPhase('fixation')
        }
      }, FEEDBACK_MS)
      return () => clearTimeout(t)
    }
  }, [phase, trialIndex])

  const getPeripheralXY = (pos: number, radius: number) => {
    const angle = PERIPHERAL_ANGLES[pos] * (Math.PI / 180)
    return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius }
  }

  const correctCount = trials.filter(t => t.centerCorrect && t.peripheralCorrect).length
  const avgReaction = trials.length > 0 ? Math.round(trials.reduce((s, t) => s + t.reactionMs, 0) / trials.length) : 0

  if (phase === 'ready') {
    return (
      <div className="flex flex-col items-center gap-6 py-8">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          {isJa ? "スピード処理トレーニング" : "Speed Processing Training"}
        </h2>
        <div className="max-w-md text-center space-y-3 text-gray-600 text-sm">
          <p>{isJa
            ? "画面中央のオブジェクト（車 or トラック）を識別しながら、周辺に一瞬表示されるターゲットの位置を記憶してください。"
            : "Identify the central object (car or truck) while remembering the position of a peripheral target that flashes briefly."}</p>
          <p>{isJa
            ? "正解が続くと表示時間が短くなり、妨害刺激が増え、難易度が上がります。"
            : "Consecutive correct answers shorten display time, increase distractors, and raise difficulty."}</p>
          <p className="text-xs text-gray-400">{isJa ? `全${TOTAL_TRIALS}試行` : `${TOTAL_TRIALS} trials per session`}</p>
        </div>
        <button onClick={startSession} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg">
          {isJa ? "スタート" : "Start Training"}
        </button>
      </div>
    )
  }

  if (phase === 'results') {
    const accuracy = trials.length > 0 ? Math.round((correctCount / trials.length) * 100) : 0
    return (
      <div className="flex flex-col items-center gap-6 py-8">
        <h2 className="text-2xl font-bold text-gray-900">{isJa ? "セッション結果" : "Session Results"}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-lg">
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{accuracy}%</div>
            <div className="text-xs text-gray-500 mt-1">{isJa ? "正答率" : "Accuracy"}</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{avgReaction}<span className="text-sm">ms</span></div>
            <div className="text-xs text-gray-500 mt-1">{isJa ? "平均反応" : "Avg Reaction"}</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{level}</div>
            <div className="text-xs text-gray-500 mt-1">{isJa ? "到達レベル" : "Level Reached"}</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{trials.length > 0 ? trials[trials.length - 1].displayMs : INITIAL_DISPLAY_MS}<span className="text-sm">ms</span></div>
            <div className="text-xs text-gray-500 mt-1">{isJa ? "最終表示時間" : "Final Display"}</div>
          </div>
        </div>
        <div className="max-w-md text-center text-sm text-gray-500 space-y-2">
          <p>{isJa
            ? "定期的なトレーニングを続けることで、脳の情報処理速度と視覚的注意力が向上します。"
            : "Regular training sessions help improve your brain's processing speed and visual attention."}</p>
          <p className="text-xs">{isJa
            ? "ACTIVE研究では、このタイプの適応型トレーニングを継続したグループで認知症リスクが25%低下しました。"
            : "In the ACTIVE study, groups who continued this type of adaptive training showed a 25% reduction in dementia risk."}</p>
        </div>
        <button onClick={() => { setPhase('ready') }} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          {isJa ? "もう一度" : "Try Again"}
        </button>
      </div>
    )
  }

  // Game area (fixation, stimulus, respond, feedback)
  return (
    <div className="flex flex-col items-center gap-4 py-4">
      {/* Status bar */}
      <div className="flex items-center gap-4 text-sm text-gray-500 w-full max-w-md justify-between">
        <span>{isJa ? "試行" : "Trial"} {trialIndex + 1}/{TOTAL_TRIALS}</span>
        <span>{isJa ? "レベル" : "Lv"} {level}</span>
        <span>{displayMs}ms</span>
        <span>{isJa ? "正解" : "Correct"} {correctCount}/{trials.length}</span>
      </div>

      {/* Game canvas area */}
      <div className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] bg-gray-100 rounded-2xl border border-gray-200 flex items-center justify-center overflow-hidden select-none">
        {phase === 'fixation' && (
          <div className="text-4xl font-bold text-gray-400">+</div>
        )}

        {phase === 'stimulus' && (
          <>
            {/* Center object */}
            <div className="absolute text-3xl" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
              {currentCenter === 'car' ? '\ud83d\ude97' : '\ud83d\ude9a'}
            </div>
            {/* Peripheral target */}
            {(() => {
              const { x, y } = getPeripheralXY(currentPeripheral, peripheralRadius)
              return (
                <div className="absolute w-6 h-6 bg-blue-500 rounded-full" style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, transform: 'translate(-50%, -50%)' }} />
              )
            })()}
            {/* Distractors */}
            {distractorPositions.map(pos => {
              const { x, y } = getPeripheralXY(pos, peripheralRadius)
              return (
                <div key={pos} className="absolute w-6 h-6 border-2 border-gray-400 rounded-full" style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, transform: 'translate(-50%, -50%)' }} />
              )
            })}
          </>
        )}

        {phase === 'respond' && (
          <div className="flex flex-col items-center gap-4 p-4">
            {answerStep === 'center' ? (
              <>
                <p className="text-sm font-medium text-gray-700">{isJa ? "中央は？" : "Center object?"}</p>
                <div className="flex gap-4">
                  <button onClick={() => { setSelectedCenter('car'); setAnswerStep('peripheral') }}
                    className="w-20 h-20 bg-white border-2 border-gray-300 rounded-xl flex items-center justify-center text-3xl hover:border-blue-500 transition-colors">
                    {'\ud83d\ude97'}
                  </button>
                  <button onClick={() => { setSelectedCenter('truck'); setAnswerStep('peripheral') }}
                    className="w-20 h-20 bg-white border-2 border-gray-300 rounded-xl flex items-center justify-center text-3xl hover:border-blue-500 transition-colors">
                    {'\ud83d\ude9a'}
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm font-medium text-gray-700">{isJa ? "ターゲットの位置は？" : "Where was the target?"}</p>
                <div className="relative w-[200px] h-[200px]">
                  {PERIPHERAL_ANGLES.map((_, i) => {
                    const { x, y } = getPeripheralXY(i, 80)
                    const labels = isJa ? PERIPHERAL_LABELS_JA : PERIPHERAL_LABELS_EN
                    return (
                      <button key={i} onClick={() => { setSelectedPeripheral(i as PeripheralPos); }}
                        className={`absolute w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-medium transition-all ${selectedPeripheral === i ? 'bg-blue-500 text-white border-blue-500' : 'bg-white border-gray-300 text-gray-600 hover:border-blue-400'}`}
                        style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, transform: 'translate(-50%, -50%)' }}
                        title={labels[i]}>
                        {labels[i].charAt(0)}
                      </button>
                    )
                  })}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl">
                    {selectedCenter === 'car' ? '\ud83d\ude97' : '\ud83d\ude9a'}
                  </div>
                </div>
                {selectedPeripheral !== null && (
                  <button onClick={submitAnswer} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
                    {isJa ? "回答する" : "Submit"}
                  </button>
                )}
              </>
            )}
          </div>
        )}

        {phase === 'feedback' && (
          <div className={`text-center p-6 ${lastCorrect ? 'text-green-600' : 'text-red-500'}`}>
            <div className="text-5xl mb-2">{lastCorrect ? '\u2713' : '\u2717'}</div>
            <p className="text-sm font-medium">{lastCorrect ? (isJa ? '正解！' : 'Correct!') : (isJa ? '不正解' : 'Incorrect')}</p>
          </div>
        )}
      </div>
    </div>
  )
}
