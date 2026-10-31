import { useEffect, useMemo, useState } from 'react'
import { FiX } from 'react-icons/fi'
import {
  FaMinus,
  FaPlus,
  FaWhatsapp,
  FaCheck,
  FaRuler,
  FaChevronDown
} from 'react-icons/fa'
import { formatPrice } from '../data/SuitList'

const fields = [
  ['chest', 'Chest'], ['waist', 'Waist'], ['shoulder', 'Shoulder'], ['sleeve', 'Sleeve length'],
  ['jacketLength', 'Jacket length'], ['trouserWaist', 'Trouser waist'], ['hip', 'Hip / seat'],
  ['inseam', 'Trouser inseam'], ['thigh', 'Thigh'], ['height', 'Full height'],
]

export default function ProductModal({ suit, onClose, onAdd, onOrderNow }) {
  const [color, setColor] = useState(suit?.colors?.[0]?.name ?? '')
  const [fit, setFit] = useState('Tailored fit')
  const [size, setSize] = useState('Made to measure')
  const [quantity, setQuantity] = useState(1)
  const [unit, setUnit] = useState('inches')
  const [measurements, setMeasurements] = useState({})
  const [customer, setCustomer] = useState({ name: '', phone: '', notes: '' })
  const [showMeasurements, setShowMeasurements] = useState(true)

  useEffect(() => {
    if (!suit) return
    const oldOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = oldOverflow
      window.removeEventListener('keydown', handleKey)
    }
  }, [suit, onClose])

  const completedMeasurements = useMemo(
    () => fields.filter(([key]) => measurements[key]?.trim()).length,
    [measurements],
  )

  if (!suit) return null

  const order = {
    suit, color, fit, size, quantity, unit, measurements, customer,
  }

  function updateMeasurement(key, value) {
    setMeasurements(current => ({ ...current, [key]: value }))
  }

  function submitToWhatsApp() {
    const phone = '2349039759971'
    const measurementLines = fields
      .filter(([key]) => measurements[key]?.trim())
      .map(([key, label]) => `• ${label}: ${measurements[key]} ${unit}`)
    const message = [
      'Hello DV SUITS, I would like to place an order.',
      '',
      `Suit: ${suit.name}`,
      `Category: ${suit.category}`,
      `Price: ${formatPrice(suit.price)}`,
      `Color: ${color}`,
      `Fit: ${fit}`,
      `Size option: ${size}`,
      `Quantity: ${quantity}`,
      `Estimated item total: ${formatPrice(suit.price * quantity)}`,
      '',
      `Name: ${customer.name || 'Not provided'}`,
      `Phone: ${customer.phone || 'Not provided'}`,
      `Measurement unit: ${unit}`,
      ...(measurementLines.length ? ['Measurements:', ...measurementLines] : ['Measurements: I would like assistance with measuring.']),
      ...(customer.notes.trim() ? ['', `Additional notes: ${customer.notes.trim()}`] : []),
      '',
      'Please confirm availability, final price, delivery, and next steps.',
    ].join('\n')
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-5" onMouseDown={e => e.target === e.currentTarget && onClose()}>
      <section role="dialog" aria-modal="true" aria-label={`Customize ${suit.name}`} className="relative max-h-[95dvh] w-full max-w-5xl overflow-y-auto bg-[#f7f5f0] shadow-2xl sm:max-h-[90vh]">
        <button onClick={onClose} aria-label="Close product details" className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center bg-white/90 transition hover:bg-black hover:text-white"><FiX size={19}/></button>
        <div className="grid lg:grid-cols-[.88fr_1.12fr]">
          <div className="relative min-h-[300px] bg-[#e9e5dc] lg:min-h-full">
            <img src={suit.image} alt={suit.name} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute bottom-5 left-5 bg-[#f7f5f0]/95 px-4 py-3">
              <p className="text-[9px] font-bold tracking-[.2em] text-stone-500">DV KINGSMAN</p>
              <p className="serif mt-1 text-xl">{suit.name}</p>
            </div>
          </div>
          <div className="p-5 sm:p-8 lg:p-10">
            <p className="text-[10px] font-bold tracking-[.22em] text-[#9b7944]">{suit.tag} / {suit.category}</p>
            <h2 className="serif mt-2 text-3xl sm:text-4xl">{suit.name}</h2>
            <p className="mt-3 text-xl font-semibold">{formatPrice(suit.price)}</p>
            <p className="mt-3 max-w-lg text-sm leading-6 text-stone-600">{suit.description}</p>

            <div className="mt-7 border-t border-black/10 pt-5">
              <div className="flex items-center justify-between"><p className="text-xs font-bold tracking-wide">CHOOSE YOUR COLOUR</p><span className="text-xs text-stone-500">{color}</span></div>
              <div className="mt-3 flex flex-wrap gap-3">
                {suit.colors.map(c => (
                  <button key={c.name} onClick={() => setColor(c.name)} aria-label={`Choose ${c.name}`} title={c.name} className={`grid h-9 w-9 place-items-center rounded-full border-2 ${color === c.name ? 'border-[#b99a61]' : 'border-transparent'}`} style={{ backgroundColor: c.hex }}>
                    {color === c.name && <FaCheck size={15} color={['Ivory','Stone'].includes(c.name) ? '#171717' : '#ffffff'}/>}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="text-xs font-semibold">FIT

                <div className="relative mt-2">
                   <select value={fit} onChange={e => setFit(e.target.value)} className="mt-2 block w-full border border-black/15 bg-transparent appearance-none px-2 py-3 text-sm font-normal outline-none focus:border-[#a58245]">
                  <option>Tailored fit</option><option>Slim fit</option><option>Regular fit</option><option>Relaxed fit</option>
                </select>

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                <FaChevronDown size={12} />
               </span> 
                </div>
              </label>

              <label className="text-xs font-semibold">SIZE

                <div className='relative mt-2'>
                    <select value={size} onChange={e => setSize(e.target.value)} className="mt-2 block w-full border border-black/15 appearance-none bg-transparent px-2 py-3 text-sm font-normal outline-none focus:border-[#a58245]">
                  <option>Made to measure</option><option>Small</option><option>Medium</option><option>Large</option><option>XL</option><option>XXL</option>
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
               <FaChevronDown size={12} />
               </span>
                </div>
              
              </label>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-xs font-semibold">QUANTITY</span>
              <div className="flex items-center border border-black/15">
                <button aria-label="Decrease quantity" onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-3 hover:bg-black/5"><FaMinus size={14}/></button>
                <span className="min-w-8 text-center text-sm">{quantity}</span>
                <button aria-label="Increase quantity" onClick={() => setQuantity(q => Math.min(20, q + 1))} className="p-3 hover:bg-black/5"><FaPlus size={14}/></button>
              </div>
            </div>

            <div id="measurements" className="mt-7 border-t border-black/10 pt-5">
              <button onClick={() => setShowMeasurements(!showMeasurements)} className="flex w-full items-center justify-between text-left">
                <span className="flex items-center gap-2 text-xs font-bold tracking-wide"><FaRuler size={16}/> PERSONAL MEASUREMENTS <span className="font-normal text-stone-500">({completedMeasurements}/{fields.length})</span></span>
                <span className="text-lg">{showMeasurements ? '−' : '+'}</span>
              </button>
              {showMeasurements && (
                <div className="mt-4">
                  <p className="mb-4 text-xs leading-5 text-stone-500">Enter measurements if you have them. Use a measuring tape and keep it comfortably snug. You can also ask our tailor for guidance on WhatsApp.</p>
                  <div className="mb-4 flex gap-2">
                    {['inches','cm'].map(u => <button key={u} onClick={() => setUnit(u)} className={`border px-4 py-2 text-xs capitalize ${unit === u ? 'border-[#201f1b] bg-[#201f1b] text-white' : 'border-black/15'}`}>{u}</button>)}
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {fields.map(([key, label]) => (
                      <label key={key} className="text-[11px] font-medium text-stone-600">{label}
                        <input type="number" min="0" step="any" value={measurements[key] || ''} onChange={e => updateMeasurement(key, e.target.value)} placeholder={unit === 'inches' ? 'Inches' : 'Centimetres'} className="mt-1.5 w-full border border-black/15 bg-transparent px-3 py-2.5 text-sm text-[#201f1b] outline-none placeholder:text-stone-400 focus:border-[#a58245]"/>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-7 border-t border-black/10 pt-5">
              <p className="text-xs font-bold tracking-wide">YOUR DETAILS <span className="font-normal text-stone-500">(optional)</span></p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <input value={customer.name} onChange={e => setCustomer({ ...customer, name: e.target.value })} placeholder="Your name" className="border border-black/15 bg-transparent px-3 py-3 text-sm outline-none focus:border-[#a58245]"/>
                <input value={customer.phone} onChange={e => setCustomer({ ...customer, phone: e.target.value })} placeholder="Your phone number" className="border border-black/15 bg-transparent px-3 py-3 text-sm outline-none focus:border-[#a58245]"/>
              </div>
              <textarea value={customer.notes} onChange={e => setCustomer({ ...customer, notes: e.target.value })} rows="2" placeholder="Event date, delivery location, or special requests..." className="mt-3 w-full resize-y border border-black/15 bg-transparent px-3 py-3 text-sm outline-none focus:border-[#a58245]"/>
            </div>

            <div className="mt-6 bg-[#eeebe3] p-4">
              <div className="flex items-center justify-between text-sm"><span className="text-stone-600">Estimated item total</span><strong>{formatPrice(suit.price * quantity)}</strong></div>
              <p className="mt-1 text-[11px] leading-5 text-stone-500">Delivery and any final tailoring adjustments will be confirmed with you before payment.</p>
            </div>
            <button onClick={submitToWhatsApp} className="mt-4 flex w-full items-center justify-center gap-2 bg-[#1f352b] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#294a3b]"><FaWhatsapp size={18}/> Order on WhatsApp</button>
            <button onClick={() => { onAdd(order); onClose() }} className="mt-2 w-full border border-black/20 px-5 py-3 text-sm font-semibold transition hover:bg-black hover:text-white">Save to your selection</button>
            <p className="mt-3 text-center text-[10px] leading-4 text-stone-500">Your WhatsApp message is prepared for you to review before sending. No payment is taken on this website.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
