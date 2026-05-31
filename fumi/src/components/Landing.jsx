import { motion } from 'framer-motion'

// Famous perfume bottles with transparent PNGs from reliable open sources
const bottles = [
  { src: '/images/dior-sauvage.avif',               alt: 'Sauvage',    style: { top: '-10%',  left: '-8%',  width: 'clamp(140px, 22vw, 320px)', rotate: -22 } },
  { src: '/images/ysl-black-opium.avif',            alt: 'Black Opium',style: { top: '20%',   right: '-6%', width: 'clamp(130px, 20vw, 300px)', rotate: 8   } },
  { src: '/images/creed-aventus.avif',              alt: 'Aventus',    style: { top: '5%',    left: '30%',  width: 'clamp(110px, 17vw, 260px)', rotate: 17  } },
  { src: '/images/ch-good-girl.avif',               alt: 'Good Girl',  style: { bottom: '-6%',right: '18%', width: 'clamp(135px, 21vw, 310px)', rotate: -11 } },
  { src: '/images/jpg-le-male-elixir.avif',         alt: 'Le Male',    style: { bottom: '8%', left: '4%',   width: 'clamp(120px, 18vw, 280px)', rotate: 14  } },
  { src: '/images/rasasi-hawas-ice.avif',           alt: 'Hawas Ice',  style: { bottom: '-4%',left: '38%',  width: 'clamp(105px, 16vw, 250px)', rotate: -7  } },
  { src: '/images/afnan-supremacy-collectors.avif', alt: 'Supremacy',  style: { top: '-4%',   right: '28%', width: 'clamp(100px, 15vw, 240px)', rotate: 12  } },
]

function BlurBottle({ src, alt, style, delay }) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{
        top: style.top,
        left: style.left,
        right: style.right,
        bottom: style.bottom,
        width: style.width,
        rotate: style.rotate,
        zIndex: 1,
      }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 1.0, ease: 'easeOut' }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: 'auto',
          filter: 'blur(5px) brightness(0.35)',
          objectFit: 'contain',
        }}
        onError={(e) => { e.target.style.display = 'none' }}
      />
    </motion.div>
  )
}

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
        background: 'radial-gradient(ellipse 55% 45% at 50% 55%, rgba(200,110,40,0.13) 0%, transparent 70%)',
        zIndex: 2,
      }} />

      {/* Blurred bottle background */}
      {bottles.map((b, i) => (
        <BlurBottle key={i} {...b} delay={0.6 + i * 0.12} />
      ))}

      {/* Subtle vignette to keep edges dark */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 65% at 50% 50%, transparent 20%, rgba(13,11,9,0.92) 100%)',
        zIndex: 3,
      }} />

      {/* Main content */}
      <div className="relative flex flex-col items-center text-center max-w-xs w-full" style={{ zIndex: 10 }}>

        {/* Wordmark */}
        <motion.div
          className="mb-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
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
            <span className="font-black" style={{ fontSize: '2.2rem', lineHeight: 1, color: 'rgba(200,110,40,0.85)' }}>
              ✦
            </span>
          </div>
        </motion.div>

        <motion.p className="text-sm font-medium mb-1" style={{ color: 'rgba(242,236,228,0.5)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          your AI scent advisor
        </motion.p>

        <motion.p className="text-sm mb-9 leading-relaxed" style={{ color: 'rgba(242,236,228,0.25)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}>
          Can't pick a scent?<br />Ask fumi.
        </motion.p>

        <motion.button
          onClick={onBegin}
          className="w-full py-4 rounded-2xl text-sm font-bold tracking-wide transition-all cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, #d4721f 0%, #b05a14 100%)',
            color: '#fff8f0',
            boxShadow: '0 4px 20px rgba(180,90,20,0.4)',
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          whileHover={{ scale: 1.02, boxShadow: '0 6px 28px rgba(180,90,20,0.55)'}}
          whileTap={{ scale: 0.97 }}
        >
          Let's find my scent →
        </motion.button>

        <motion.p className="text-xs mt-4" style={{ color: 'rgba(242,236,228,0.18)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
          Middle Eastern · Designer · Niche
        </motion.p>

      </div>
    </motion.div>
  )
}