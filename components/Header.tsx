"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export function Header() {
  const pathname = usePathname()
  const isJa = pathname.startsWith("/ja")
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = isJa
    ? [
        { href: "/ja", label: "トレーニング" },
        { href: "/ja/about", label: "研究について" },
      ]
    : [
        { href: "/", label: "Training" },
        { href: "/about", label: "About the Research" },
      ]

  const langHref = isJa ? (pathname.replace("/ja", "") || "/") : ("/ja" + pathname)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={isJa ? "/ja" : "/"} className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          </div>
          <span className="font-bold text-gray-900 text-lg">Speed Training</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map(item => (
            <Link key={item.href} href={item.href} className={`text-sm font-medium transition-colors ${pathname === item.href ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
              {item.label}
            </Link>
          ))}
          <Link href={langHref} className="text-sm text-gray-500 hover:text-gray-900 border-l border-gray-200 pl-6 ml-2">
            {isJa ? "EN" : "JP"}
          </Link>
        </nav>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-gray-600 cursor-pointer" aria-label="Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d={menuOpen ? "M6 6l12 12M6 18L18 6" : "M4 8h16M4 16h16"}/></svg>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-4">
          {navItems.map(item => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="block py-2 text-sm text-gray-700 hover:text-blue-600">
              {item.label}
            </Link>
          ))}
          <Link href={langHref} onClick={() => setMenuOpen(false)} className="block py-2 text-sm text-gray-500">
            {isJa ? "English" : "Japanese"}
          </Link>
        </div>
      )}
    </header>
  )
}
