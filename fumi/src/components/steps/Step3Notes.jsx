import { motion } from 'framer-motion'

function Step3Notes({ value, onSelect, onNext, onBack }) {
  const options = [
    { label: '🪵 Woody', sub: 'Oud, Cedar, Sandalwood', value: 'woody' },
    { label: '🌸 Floral', sub: 'Rose, Jasmine, Lily', value: 'floral' },
    { label: '🍊 Citrus', sub: 'Bergamot, Lemon, Orange', value: 'citrus' },
    { label: '🍬 Sweet', sub: 'Vanilla, Caramel, Tonka', value: 'sweet' },
    { label: '🌿 Fresh', sub: 'Vetiver, Herbs, Grass', value: 'fresh' },
    { label: '🔥 Spicy', sub: 'Pepper, Cinnamon, Cardamom', value: 'spicy' },
    { label: '🌊 Aquatic', sub: 'Sea Breeze, Ocean, Mist', value: 'aquatic' },
    { label: '🍃 Earthy', sub: 'Musk, Amber, Patchouli', value: 'earthy' },
  ]

  const toggle = (val) => {
    const updated = value.includes(val)
      ? value.filter(n => n !== val)
      : [...value, val]
    onSelect(updated)
  }

return (
  <motion.div
    className="w-full max-w-sm"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3, ease: 'easeOut' }}
  >
      <p className="text-xs uppercase tracking-widest text-amber-500/60 mb-2">Step 3 of 4</p>
      <h2 className="text-2xl font-medium text-[#f2ece4] mb-1">Any scents you like?</h2>
      {/* Changed subtitle to signal this is optional */}
      <p className="text-sm text-white/30 mb-8">Optional — skip if you're not sure.</p>

      <div className="grid grid-cols-2 gap-3">
        {options.map(opt => (
          <button
            key={opt.value}
            onClick={() => toggle(opt.value)}
            className={`p-4 rounded-2xl border text-left transition-all
              ${value.includes(opt.value)
                ? 'bg-amber-700/20 border-amber-600/40 text-amber-400'
                : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
              }`}
          >
            <p className="text-sm font-medium">{opt.label}</p>
            <p className="text-xs mt-1 opacity-60">{opt.sub}</p>
          </button>
        ))}
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={onBack}
          className="cursor-pointer px-5 py-3 rounded-2xl border border-white/10 text-white/40 text-sm hover:border-white/20 transition-all"
        >
          Back
        </button>
        {/* disabled removed — notes are now optional */}
        <button
          onClick={onNext}
          className="disabled:cursor-not-allowed cursor-pointer flex-1 py-3 rounded-2xl bg-amber-700 text-white text-sm font-medium hover:bg-amber-600 transition-all"
        >
          Continue
        </button>
      </div>
    </motion.div>
  )
}

export default Step3Notes