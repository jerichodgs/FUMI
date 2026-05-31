import { motion } from 'framer-motion'

// Scent orbs floating in background
const orbs = [
  { emoji: '🌸', label: 'Floral',   x: '8%',  y: '15%', delay: 1.0 },
  { emoji: '🪵', label: 'Woody',    x: '82%', y: '20%', delay: 1.2 },
  { emoji: '🌊', label: 'Aquatic',  x: '5%',  y: '65%', delay: 1.4 },
  { emoji: '🔥', label: 'Spicy',    x: '80%', y: '60%', delay: 1.1 },
  { emoji: '🍊', label: 'Citrus',   x: '15%', y: '82%', delay: 1.5 },
  { emoji: '🍬', label: 'Sweet',    x: '75%', y: '82%', delay: 1.3 },
]

export default function Landing({ onBegin }) {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6"
      style={{ background: '#0d0b09' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Ambient warm glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(200,110,40,0.10) 0%, transparent 70%)'
      }} />

      {/* Floating scent chips */}
      {orbs.map((o, i) => (
        <motion.div
          key={o.label}
          className="absolute flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium select-none pointer-events-none"
          style={{
            left: o.x, top: o.y,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.25)',
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: o.delay, duration: 0.6 }}
        >
          <span>{o.emoji}</span>
          <span>{o.label}</span>
        </motion.div>
      ))}

      {/* Main card */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-xs w-full">

        {/* Wordmark */}
        <motion.div
          className="mb-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {/* "fumi" in a chunky rounded style — modern + friendly */}
          <div className="flex items-baseline gap-0.5">
            <span
              className="font-black tracking-tight"
              style={{
                fontSize: '3.2rem',
                lineHeight: 1,
                background: 'linear-gradient(135deg, #f2ece4 30%, rgba(200,110,40,0.9) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
              }}
            >
              fumi
            </span>
            <span
              className="font-black"
              style={{
                fontSize: '3.2rem',
                lineHeight: 1,
                color: 'rgba(200,110,40,0.85)',
                letterSpacing: '-0.02em',
              }}
            >
              ✦
            </span>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-sm mb-1 font-medium"
          style={{ color: 'rgba(242,236,228,0.5)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          your AI scent advisor
        </motion.p>

        <motion.p
          className="text-sm mb-9 leading-relaxed"
          style={{ color: 'rgba(242,236,228,0.25)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.5 }}
        >
          Can't pick a scent?<br/>Ask fumi.
        </motion.p>

        {/* CTA */}
        <motion.button
          onClick={onBegin}
          className="w-full py-4 rounded-2xl text-sm font-bold tracking-wide transition-all"
          style={{
            background: 'linear-gradient(135deg, #d4721f 0%, #b05a14 100%)',
            color: '#fff8f0',
            boxShadow: '0 4px 20px rgba(180,90,20,0.4)',
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          whileHover={{ scale: 1.02, boxShadow: '0 6px 28px rgba(180,90,20,0.55)' }}
          whileTap={{ scale: 0.97 }}
        >
          Let's find my scent →
        </motion.button>

        {/* Social proof nudge */}
        <motion.p
          className="text-xs mt-4"
          style={{ color: 'rgba(242,236,228,0.18)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          Middle Eastern · Designer · Niche
        </motion.p>

      </div>
    </motion.div>
  )
}