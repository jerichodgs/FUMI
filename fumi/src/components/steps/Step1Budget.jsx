import { motion } from 'framer-motion'

function Step1Budget({ value, onSelect, onNext }) {
  const options = [
    { label: '₱500 – ₱1,500', value: '500_1500' },
    { label: '₱1,500 – ₱3,000', value: '1500_3000' },
    { label: '₱3,000+', value: '3000_plus' },
  ]

  return (
    <motion.div
      className="w-full max-w-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <p className="text-xs uppercase tracking-widest text-amber-500/60 mb-2">Step 1 of 4</p>
      <h2 className="text-2xl font-medium text-[#f2ece4] mb-1">What's your budget?</h2>
      <p className="text-sm text-white/30 mb-8">We'll find the best options in your range.</p>

      <div className="flex flex-col gap-3">
        {options.map(opt => (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className={`w-full p-4 rounded-2xl border text-left text-sm font-medium transition-all
              ${value === opt.value
                ? 'bg-amber-700/20 border-amber-600/40 text-amber-400'
                : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
              }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={!value}
        className="mt-6 w-full py-3 rounded-2xl bg-amber-700 text-white text-sm font-medium
          disabled:opacity-30 disabled:cursor-not-allowed hover:bg-amber-600 transition-all"
      >
        Continue →
      </button>
    </motion.div>
  )
}

export default Step1Budget