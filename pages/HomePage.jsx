import { useMemo, useState } from 'react';
import { FaArrowDown, FaArrowRight, FaCheck, FaChevronRight, FaWhatsapp, FaRuler, FaShieldVirus } from 'react-icons/fa';
import Navbar from '../component/Navbar';
import SuitCard from '../component/SuitCard';
import ProductModal from '../component/ProductModal';
import CartDrawer from '../component/CartDrawer';
import Footer from '../component/Footer';
import { SuitList, formatPrice } from '../data/SuitList';

const whatsappNumber = '2349039759971'

export default function HomePage() {
  const [selectedSuit, setSelectedSuit] = useState(null)
  const [savedItems, setSavedItems] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [filter, setFilter] = useState('All suits')
  const [toast, setToast] = useState('')

  const categories = ['All suits', 'Two-Piece Suit', 'Three-Piece Suit', 'Modern Slim Fit', 'Wedding Suit']
  const visibleSuits = useMemo(() => filter === 'All suits' ? SuitList : SuitList.filter(suit => suit.category === filter), [filter])

  function saveSelection(order) {
    setSavedItems(items => [...items, order])
    setToast(`${order.suit.name} saved to your selection`)
    window.setTimeout(() => setToast(''), 2600)
  }

  function removeSelection(index) {
    setSavedItems(items => items.filter((_, i) => i !== index))
  }

  function sendSavedItems() {
    if (!savedItems.length) return
    const message = [
      'Hello DV Kingsman, I would like to discuss this suit order:',
      '',
      ...savedItems.flatMap((item, index) => [
        `${index + 1}. ${item.suit.name}`,
        `Colour: ${item.color}`,
        `Fit: ${item.fit}`,
        `Size: ${item.size}`,
        `Quantity: ${item.quantity}`,
        `Item total: ${formatPrice(item.suit.price * item.quantity)}`,
        ...(Object.entries(item.measurements || {}).filter(([, value]) => String(value).trim()).length ? [
          'Measurements:',
          ...Object.entries(item.measurements).filter(([, value]) => String(value).trim()).map(([key, value]) => `• ${key}: ${value} ${item.unit}`),
        ] : ['Measurements: I need help with measuring.']),
        '',
      ]),
      `Estimated total: ${formatPrice(savedItems.reduce((sum, item) => sum + item.suit.price * item.quantity, 0))}`,
      '',
      'Please confirm availability, final price, and delivery options.',
    ].join('\n')
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-[#201f1b]">
      <div className="bg-[#1f201c] px-4 py-2.5 text-center text-[9px] font-medium tracking-[.19em] text-white sm:text-[10px]">
        GOOD TAILORING IS NEVER JUST ABOUT THE SUIT — IT'S ABOUT THE PERSON IN IT.
      </div>
      <Navbar onExplore={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })} cartCount={savedItems.length} onOpenCart={() => setCartOpen(true)} />

      <main>
        <section className="relative overflow-hidden">
          <div className="mx-auto grid max-w-[1440px] lg:min-h-[640px] lg:grid-cols-[.95fr_1.05fr]">
            <div className="relative z-10 flex flex-col justify-center px-5 pb-12 pt-16 sm:px-8 sm:pt-20 lg:px-12 lg:py-24">
              <div className="mb-7 flex items-center gap-3 text-[10px] font-semibold tracking-[.22em] text-[#92703b]"><span className="h-px w-9 bg-[#b99a61]"/> THE ART OF A BETTER FIT</div>
              <h1 className="serif max-w-[650px] text-[clamp(3.2rem,7.3vw,6.8rem)] leading-[.98] tracking-[-.055em]">Wear the<br/><span className="italic text-[#9b7944]">difference.</span></h1>
              <p className="mt-7 max-w-md text-sm leading-7 text-stone-600 sm:text-base">Modern suits, thoughtful details, and a fit that feels like it was always meant for you. Find your next signature look.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <button onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })} className="group flex items-center gap-7 bg-[#201f1b] px-6 py-4 text-xs font-semibold tracking-wide text-white transition hover:bg-[#3a382f]">EXPLORE THE COLLECTION <FaArrowRight className="transition group-hover:translate-x-1"/></button>
                <button onClick={() => document.getElementById('measurements')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center gap-2 border border-black/20 px-5 py-4 text-xs font-semibold transition hover:border-black"><FaRuler size={15}/> MADE TO MEASURE</button>
              </div>
              <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 border-t border-black/10 pt-6 text-[10px] tracking-[.12em] text-stone-500 sm:mt-16"><span className="flex items-center gap-2"><FaCheck className="text-[#9b7944]"/> PERSONAL COLOUR CHOICE</span><span className="flex items-center gap-2"><FaCheck className="text-[#9b7944]"/> DIRECT WHATSAPP ORDERING</span></div>
            </div>
            <div className="relative min-h-[430px] overflow-hidden bg-[#ded7c9] sm:min-h-[550px] lg:min-h-[640px]">
              <img src="https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1500&q=90" alt="Man in a refined tailored suit" className="absolute inset-0 h-full w-full object-cover object-center"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/5"/>
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white sm:bottom-9 sm:left-9 sm:right-9">
                <div><p className="text-[9px] tracking-[.22em]">THE NEW FORMAL</p><p className="serif mt-2 text-2xl sm:text-3xl">A sharper kind of classic.</p></div>
                <span className="grid h-11 w-11 place-items-center rounded-full border border-white/60"><FaArrowDown size={19}/></span>
              </div>
              <div className="absolute right-5 top-5 hidden border border-white/60 px-4 py-3 text-[9px] leading-5 tracking-[.18em] text-white sm:block">CUT WITH INTENTION<br/>WORN WITH CONFIDENCE</div>
            </div>
          </div>
        </section>

        <section className="border-y border-black/10 bg-[#efede6]">
          <div className="mx-auto grid max-w-[1440px] gap-6 px-5 py-6 sm:grid-cols-3 sm:px-8 lg:px-12">
            <div className="flex items-center gap-3"><FaRuler size={20} className="text-[#9b7944]"/><div><p className="text-xs font-semibold">A fit that feels personal</p><p className="mt-1 text-[11px] text-stone-500">Made-to-measure options</p></div></div>
            <div className="flex items-center gap-3"><FaShieldVirus size={20} className="text-[#9b7944]"/><div><p className="text-xs font-semibold">A considered choice</p><p className="mt-1 text-[11px] text-stone-500">Choose your preferred colour</p></div></div>
            <div className="flex items-center gap-3"><FaWhatsapp size={20} className="text-[#9b7944]"/><div><p className="text-xs font-semibold">Personal service, directly</p><p className="mt-1 text-[11px] text-stone-500">Confirm your order on WhatsApp</p></div></div>
          </div>
        </section>

        <section id="collection" className="mx-auto max-w-[1440px] scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div><p className="text-[10px] font-bold tracking-[.22em] text-[#9b7944]">THE COLLECTION</p><h2 className="serif mt-3 text-4xl tracking-tight sm:text-5xl">Made to make an entrance.</h2><p className="mt-4 max-w-xl text-sm leading-6 text-stone-600">From everyday refinement to once-in-a-lifetime occasions, find a silhouette that fits your moment.</p></div>
            <p className="text-xs text-stone-500">{visibleSuits.length} styles to explore</p>
          </div>
          <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
            {categories.map(category => <button key={category} onClick={() => setFilter(category)} className={`shrink-0 border px-4 py-2.5 text-[11px] transition ${filter === category ? 'border-[#201f1b] bg-[#201f1b] text-white' : 'border-black/15 hover:border-black/50'}`}>{category}</button>)}
          </div>
          <div className="mt-6 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6">
            {visibleSuits.map(suit => <SuitCard key={suit.id} suit={suit} onChoose={setSelectedSuit}/>)}
          </div>
          <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-black/10 pt-6 sm:flex-row sm:items-center">
            <p className="max-w-lg text-xs leading-5 text-stone-500">Every suit can be discussed with our team. Colours on screen may vary slightly from the actual fabric.</p>
            <button onClick={() => setSelectedSuit(SuitList[0])} className="flex items-center gap-2 text-xs font-semibold hover:text-[#9b7944]">PERSONALISE A SUIT <FaChevronRight/></button>
          </div>
        </section>

        <section id="craft" className="scroll-mt-20 bg-[#22231f] text-[#f7f5f0]">
          <div className="mx-auto grid max-w-[1440px] lg:grid-cols-2">
            <div className="relative min-h-[360px] overflow-hidden sm:min-h-[470px]">
              <img src="https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&w=1200&q=85" alt="Tailoring craftsmanship and suit details" loading="lazy" className="absolute inset-0 h-full w-full object-cover"/>
              <div className="absolute inset-0 bg-black/10"/>
            </div>
            <div className="flex flex-col justify-center px-5 py-14 sm:px-10 sm:py-20 lg:px-16">
              <p className="text-[10px] font-bold tracking-[.22em] text-[#c6a56c]">THE DV Kingsman APPROACH</p>
              <h2 className="serif mt-4 max-w-lg text-4xl leading-tight sm:text-5xl">Details matter.<br/><span className="italic text-[#c6a56c]">So do you.</span></h2>
              <p className="mt-5 max-w-lg text-sm leading-7 text-white/60">A good suit should do more than look right on a hanger. It should work with your proportions, suit the occasion, and help you feel ready for the room you're walking into.</p>
              <div className="mt-8 space-y-5">
                {[['01','Choose your silhouette','Pick a style and fit that feels like you.'],['02','Make it your own','Select a colour and share your measurements.'],['03','Confirm with our team','Review your order details directly on WhatsApp.']].map(([num,title,desc]) => <div key={num} className="flex gap-4 border-t border-white/15 pt-4"><span className="serif text-xl text-[#c6a56c]">{num}</span><div><p className="text-sm font-semibold">{title}</p><p className="mt-1 text-xs leading-5 text-white/50">{desc}</p></div></div>)}
              </div>
            </div>
          </div>
        </section>

        <section className="site-grid px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-[10px] font-bold tracking-[.22em] text-[#9b7944]">YOUR FIT, YOUR WAY</p>
            <h2 className="serif mt-4 text-4xl leading-tight sm:text-6xl">The best fit is<br/><span className="italic">the one made for you.</span></h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-stone-600">Have your measurements ready? Add them when personalising a suit. Not sure how to measure? Leave them blank and ask our team to guide you.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button onClick={() => setSelectedSuit(SuitList[0])} className="flex items-center justify-center gap-3 bg-[#201f1b] px-7 py-4 text-xs font-semibold tracking-wide text-white transition hover:bg-[#3a382f]"><FaRuler size={16}/> START PERSONALISING <FaArrowRight/></button>
              <button onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello DV Kingsman, I would like guidance on taking my suit measurements.')}`, '_blank', 'noopener,noreferrer')} className="flex items-center justify-center gap-2 border border-black/20 px-7 py-4 text-xs font-semibold transition hover:bg-white"><FaWhatsapp size={16}/> ASK FOR MEASUREMENT HELP</button>
            </div>
          </div>
        </section>

        <section className="bg-[#e9e5dc] px-5 py-12 sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div><p className="text-[10px] font-bold tracking-[.2em] text-[#9b7944]">YOUR NEXT OCCASION STARTS HERE</p><p className="serif mt-2 text-2xl sm:text-3xl">Find the suit. Make the moment.</p></div>
            <button onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center justify-center gap-4 border border-black/20 px-6 py-4 text-xs font-semibold transition hover:bg-[#201f1b] hover:text-white">SHOP THE COLLECTION <FaArrowRight/></button>
          </div>
        </section>
      </main>

      <Footer />

      {selectedSuit && <ProductModal suit={selectedSuit} onClose={() => setSelectedSuit(null)} onAdd={saveSelection}/>}
      <CartDrawer open={cartOpen} items={savedItems} onClose={() => setCartOpen(false)} onRemove={removeSelection} onCheckout={sendSavedItems}/>
      {toast && <div role="status" className="fixed bottom-5 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-2 whitespace-nowrap bg-[#201f1b] px-5 py-3 text-xs font-medium text-white shadow-xl"><FaCheck className="text-[#c6a56c]"/>{toast}</div>}
    </div>
  )
}


