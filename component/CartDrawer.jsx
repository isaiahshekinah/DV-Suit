import { FiX, FiTrash2, FiMessageCircle } from 'react-icons/fi';
import { formatPrice } from '../data/SuitList';

export default function CartDrawer({ open, items, onClose, onRemove, onCheckout }) {
  if (!open) return null
  const total = items.reduce((sum, item) => sum + item.suit.price * item.quantity, 0)
  return (
    <div className="fixed inset-0 z-[60] bg-black/50" onMouseDown={e => e.target === e.currentTarget && onClose()}>

      <aside className="ml-auto flex h-full w-full max-w-md flex-col bg-[#f7f5f0] shadow-2xl">
        <div className="flex items-center justify-between border-b border-black/10 p-5">
          <div><p className="serif text-2xl">Your selection</p><p className="mt-1 text-xs text-stone-500">{items.length} saved item{items.length === 1 ? '' : 's'}</p></div>
          <button onClick={onClose} aria-label="Close selection" className="grid h-10 w-10 place-items-center border border-black/15"><FiX size={18}/></button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? <div className="py-20 text-center"><p className="serif text-2xl">Nothing selected yet.</p><p className="mt-2 text-sm text-stone-500">Choose a suit from the collection to get started.</p></div> :
            <div className="space-y-5">{items.map((item, index) => (
              <div key={`${item.suit.id}-${index}`} className="flex gap-4 border-b border-black/10 pb-5">
                <img src={item.suit.image} alt={item.suit.name} className="h-28 w-24 object-cover"/>
                <div className="min-w-0 flex-1">
                  <p className="serif text-lg">{item.suit.name}</p>
                  <p className="mt-1 text-xs text-stone-500">{item.color} · {item.fit}</p>
                  <p className="mt-1 text-xs text-stone-500">{item.size} · Qty {item.quantity}</p>
                  <p className="mt-2 text-sm font-semibold">{formatPrice(item.suit.price * item.quantity)}</p>
                  <button onClick={() => onRemove(index)} className="mt-2 flex items-center gap-1 text-xs text-stone-500 hover:text-red-700"><FiTrash2 size={13}/> Remove</button>
                </div>
              </div>
            ))}
            </div>}
        </div>
        {items.length > 0 && <div className="border-t border-black/10 p-5">
          <div className="mb-4 flex items-center justify-between"><span className="text-sm text-stone-600">Estimated total</span><strong>{formatPrice(total)}</strong></div>
          <button onClick={onCheckout} className="flex w-full items-center justify-center gap-2 bg-[#1f352b] px-5 py-4 text-sm font-semibold text-white hover:bg-[#294a3b]"><FiMessageCircle size={18}/> Send selection to WhatsApp</button>
          <p className="mt-3 text-center text-[10px] text-stone-500">Final price, delivery, and measurements confirmed with the tailor.</p>
        </div>}
      </aside>
    </div>
  )
}
