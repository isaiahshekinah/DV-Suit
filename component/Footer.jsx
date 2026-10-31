import { FiInstagram, FiArrowUpRight } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="bg-[#1f201c] text-[#f7f5f0]">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.3fr_.7fr_.7fr] lg:px-12 lg:py-20">
        <div>
          <p className="serif text-3xl">DV Kingsman</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-white/55">Considered tailoring. Personal fit. Pieces made for the moments that matter.</p>
        </div>
        <div><p className="text-[10px] font-bold tracking-[.2em] text-[#c6a56c]">EXPLORE</p><div className="mt-4 flex flex-col gap-3 text-sm text-white/70"><a href="#collection" className="hover:text-white">The collection</a><a href="#craft" className="hover:text-white">Our craft</a><a href="#measurements" className="hover:text-white">Made for you</a></div></div>
        <div><p className="text-[10px] font-bold tracking-[.2em] text-[#c6a56c]">PERSONAL SERVICE</p><p className="mt-4 text-sm leading-6 text-white/60">Need help choosing a fit or taking measurements? Our WhatsApp ordering flow lets you speak with us directly.</p><a href="#collection" className="mt-4 inline-flex items-center gap-2 text-sm hover:text-[#c6a56c]">Find your suit <FiArrowUpRight/></a></div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-[10px] tracking-wide text-white/40 sm:px-8 lg:px-12"><div className="mx-auto flex max-w-[1440px] flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} DV Kingsman. All rights reserved.</span><span>MADE WITH INTENTION.</span></div></div>
    </footer>
  )
}
