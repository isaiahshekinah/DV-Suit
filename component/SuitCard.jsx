import { FiArrowUpRight } from 'react-icons/fi'
import { formatPrice } from '../data/SuitList'

export default function SuitCard({ suit, onChoose }) {
  return (
    <article className="group">
      <button onClick={() => onChoose(suit)} className="block w-full text-left">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#e9e5dc]">
          <img src={suit.image} alt={`${suit.name} suit inspiration`} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.045]" />
          <span className="absolute left-4 top-4 bg-[#f7f5f0] px-3 py-2 text-[9px] font-bold tracking-[.17em]">{suit.tag}</span>
          <span className="absolute bottom-4 right-4 grid h-11 w-11 translate-y-2 place-items-center rounded-full bg-[#f7f5f0] opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100"><FiArrowUpRight size={19}/></span>
        </div>
        <div className="flex items-start justify-between gap-3 pt-4">
          <div>
            <h3 className="serif text-xl">{suit.name}</h3>
            <p className="mt-1 text-xs text-stone-500">{suit.category}</p>
            <div className="mt-3 flex gap-1.5">
              {suit.colors.slice(0, 4).map(color => <span key={color.name} title={color.name} className="h-3.5 w-3.5 rounded-full border border-black/10" style={{ backgroundColor: color.hex }} />)}
            </div>
          </div>
          <p className="pt-1 text-sm font-semibold">{formatPrice(suit.price)}</p>
        </div>
      </button>
    </article>
  )
}
