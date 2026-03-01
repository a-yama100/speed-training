"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Footer() {
  const pathname = usePathname()
  const isJa = pathname.startsWith("/ja")
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gray-950 border-t border-gray-800 py-10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-6 mb-8">
          <div>
            <Link href={isJa ? "/ja" : "/"} className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              </div>
              <span className="font-bold text-white">Speed Training</span>
            </Link>
            <p className="text-gray-400 text-sm max-w-md">
              {isJa
                ? "ACTIVE研究に基づく認知スピード処理トレーニング。視覚的注意力と情報処理速度を鍛えます。"
                : "Cognitive speed-of-processing training inspired by the ACTIVE study. Train your visual attention and processing speed."}
            </p>
          </div>
          <div className="flex gap-8 text-sm">
            <div className="flex flex-col gap-2">
              <Link href={isJa ? "/ja/about" : "/about"} className="text-gray-400 hover:text-white transition-colors">
                {isJa ? "研究について" : "About"}
              </Link>
              <a href="https://www.phtechai.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                PH Tech AI
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <Link href={isJa ? "/ja" : "/"} className="text-gray-400 hover:text-white transition-colors">
                {isJa ? "トレーニング" : "Training"}
              </Link>
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-500">
          <span>{year} PH Tech AI. All Rights Reserved.</span>
          <Link href={isJa ? (pathname.replace("/ja", "") || "/") : ("/ja" + pathname)} className="text-gray-400 hover:text-white transition-colors">
            {isJa ? "English" : "Japanese"}
          </Link>
        </div>
      </div>
    </footer>
  )
}
