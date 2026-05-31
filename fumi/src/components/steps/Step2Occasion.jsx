import { motion } from 'framer-motion'

const options = [
  { label: '🌙 Date Night',     sub: 'Evening, romantic setting',    value: 'date' },
  { label: '💼 Office / Work',  sub: 'Professional environment',     value: 'office' },
  { label: '🎓 School',         sub: 'Everyday campus wear',         value: 'school' },
  { label: '👕 Casual / Daily', sub: 'Relaxed everyday wear',        value: 'casual' },
  { label: '🎉 Special Event',  sub: 'Celebrations, nights out',     value: 'event' },
  { label: '🏠 At Home',        sub: 'Lounging, self care',          value: 'home' },
]

export default function Step2Occasion({ value, onSelect, onNext, onBack }) {
  // value is now an array for multi-select
  const selected = Array.isArray(value) ? value : (value ? [value] : [])

  const toggle = (v) => {
    if (selected.includes(v)) {
      onSelect(selected.filter(s => s !== v))
    } else {
      onSelect([...selected, v])
    }
  }

  return (
    <motion.div
      className="w-full max-w-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <p className="text-xs uppercase tracking-widest text-amber-500/60 mb-2">Step 2 of 4</p>
      <h2 className="text-2xl font-medium text-[#f2ece4] mb-1">When will you wear it?</h2>
      <p className="text-sm text-white/30 mb-6">Pick all that apply — we'll find something versatile.</p>

      <div className="flex flex-col gap-2.5">
        {options.map(opt => {
          const isSelected = selected.includes(opt.value)
          return (
            <button
              key={opt.value}
              onClick={() => toggle(opt.value)}
              className="w-full p-4 rounded-2xl border text-left transition-all relative overflow-hidden"
              style={{
                background: isSelected ? 'rgba(180,90,20,0.18)' : 'rgba(255,255,255,0.04)',
                borderColor: isSelected ? 'rgba(200,110,40,0.5)' : 'rgba(255,255,255,0.08)',
              }}
            >
              {/* Checkmark */}
              {isSelected && (
                <span className="absolute top-3 right-4 text-amber-500 text-sm font-bold">✓</span>
              )}
              <p className="text-sm font-medium" style={{ color: isSelected ? '#f2ece4' : 'rgba(242,236,228,0.55)' }}>
                {opt.label}
              </p>
              <p className="text-xs mt-0.5" style={{ color: isSelected ? 'rgba(200,110,40,0.7)' : 'rgba(242,236,228,0.25)' }}>
                {opt.sub}
              </p>
            </button>
          )
        })}
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={onBack}
          className="cursor-pointer px-5 py-3 rounded-2xl text-sm transition-all"
          style={{ border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(242,236,228,0.35)' }}
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={selected.length === 0}
          className="disabled:cursor-not-allowed cursor-pointer flex-1 py-3 rounded-2xl text-sm font-semibold transition-all disabled:opacity-30"
          style={{
            background: 'linear-gradient(135deg, #d4721f, #b05a14)',
            color: '#fff8f0',
            boxShadow: selected.length > 0 ? '0 4px 16px rgba(180,90,20,0.35)' : 'none',
          }}
        >
          Continue
        </button>
      </div>
    </motion.div>
  )
}