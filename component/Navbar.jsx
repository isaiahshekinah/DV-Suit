import { useState } from 'react';
import { FiMenu, FiShoppingBag, FiX } from 'react-icons/fi';

export default function Navbar({ onExplore, cartCount, onOpenCart }) {
  const [menuOpen, setMenuOpen] = useState(false)

  function goTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-[#f7f5f0]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 text-left">
          <span className="grid h-10 w-10 place-items-center border border-[#b99a61] text-sm font-semibold tracking-tight">DV<span className="text-[#a58245] text-[8px]">Kingsman</span></span>
          <span>
            <span className="serif block text-[19px] leading-5 tracking-wide">DV Kingsman</span>
            <span className="mt-1 block text-[9px] tracking-[.24em] text-stone-500">MODERN TAILORING</span>
          </span>
        </button>

        <nav className="hidden items-center gap-9 text-[12px] font-semibold tracking-[.12em] text-stone-600 md:flex">
          <button onClick={() => goTo('collection')} className="transition hover:text-black">COLLECTION</button>
          <button onClick={() => goTo('craft')} className="transition hover:text-black">OUR CRAFT</button>
          <button onClick={() => goTo('measurements')} className="transition hover:text-black">MADE FOR YOU</button>
        </nav>

        <div className="flex items-center gap-3">
          <button onClick={onOpenCart} className="relative flex h-10 items-center gap-2 border border-black/15 px-3 text-xs font-semibold transition hover:bg-black hover:text-white">
            <FiShoppingBag size={16} /> <span className="hidden sm:inline">YOUR SELECTION</span>
            {cartCount > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#b99a61] px-1 text-[10px] text-white">{cartCount}</span>}
          </button>
          <button aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)} className="grid h-10 w-10 place-items-center border border-black/15 md:hidden">
            {menuOpen ? <FiX size={19} /> : <FiMenu size={19} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="border-t border-black/10 bg-[#f7f5f0] px-6 py-5 md:hidden">
          <div className="flex flex-col gap-4 text-sm">
            <button onClick={() => goTo('collection')} className="text-left">Collection</button>
            <button onClick={() => goTo('craft')} className="text-left">Our craft</button>
            <button onClick={() => goTo('measurements')} className="text-left">Made for you</button>
          </div>
        </div>
      )}
    </header>
  )
}

import React from 'react'
