import { motion } from 'framer-motion'

function Step4Gender({ value, onSelect, onBack, onSubmit }) {
  const options = [
    { label: 'Masculine', sub: 'Bold, classic men\'s profiles', value: 'masculine' },
    { label: 'Feminine', sub: 'Soft, classic women\'s profiles', value: 'feminine' },
    { label: 'Unisex', sub: 'Works for anyone', value: 'unisex' },
  ]

  return (
  <motion.div
    className="w-full max-w-sm"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3, ease: 'easeOut' }}
  >
      <p className="text-xs uppercase tracking-widest text-amber-500/60 mb-2">Step 4 of 4</p>
      <h2 className="text-2xl font-medium text-[#f2ece4] mb-1">Who is it for?</h2>
      <p className="text-sm text-white/30 mb-8">Helps us match the right scent profile.</p>

      <div className="flex flex-col gap-3">
        {options.map(opt => (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className={`w-full p-4 rounded-2xl border text-left transition-all
              ${value === opt.value
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
          className="px-5 py-3 rounded-2xl border border-white/10 text-white/40 text-sm hover:border-white/20 transition-all"
        >
          Back
        </button>
        <button
          onClick={onSubmit}
          disabled={!value}
          className="flex-1 py-3 rounded-2xl bg-amber-700 text-white text-sm font-medium
            disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer hover:bg-amber-600 transition-all"
        >
          Find My Scent ✦
        </button>
      </div>
    </motion.div>
  )
}

export default Step4Gender