import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ScentVisual from './ScentVisual'

const NOTE_COLORS = {
  woody:   '#c4845a',
  earthy:  '#8fa85a',
  spicy:   '#d46a4a',
  sweet:   '#c47ad4',
  floral:  '#e07aaa',
  fresh:   '#5ac4d4',
  aquatic: '#5a9cd4',
  citrus:  '#d4b44a',
}

function PerfumeCard({ rec, index }) {
  const [imgStatus, setImgStatus] = useState('loading') // 'loading' | 'ok' | 'fail'
  const accent = NOTE_COLORS[rec.notes?.[0]] || '#d4721f'
  const hasImage = rec.image && imgStatus !== 'fail'

  return (
    <motion.div
      className="rounded-3xl overflow-hidden flex flex-col"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 4px 40px rgba(0,0,0,0.4)',
      }}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.45, ease: 'easeOut' }}
    >
      {/* Image area */}
      <div className="w-full relative flex-shrink-0" style={{ height: '260px', background: 'rgba(0,0,0,0.2)' }}>

        {/* Always render img if we have a path — hide until loaded */}
        {rec.image && (
          <img
            src={rec.image}
            alt={rec.name}
            onLoad={() => setImgStatus('ok')}
            onError={() => setImgStatus('fail')}
            className="absolute inset-0 w-full h-full object-contain p-6 transition-opacity duration-500"
            style={{
              opacity: imgStatus === 'ok' ? 1 : 0,
              filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.6))',
            }}
          />
        )}

        {/* Show ScentVisual while loading or on fail */}
        {(imgStatus !== 'ok') && (
          <div className="absolute inset-0">
            <ScentVisual notes={rec.notes || []} />
          </div>
        )}

        {/* Bottom gradient for smooth card transition */}
        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(13,11,9,0.7), transparent)' }} />

        {/* Brand badge overlaid on image */}
        <div className="absolute top-3 left-3">
          <span className="text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full font-medium"
            style={{
              background: 'rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.45)',
              backdropFilter: 'blur(8px)',
            }}>
            {rec.brand}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col gap-3 flex-1">

        <div className="flex items-start justify-between gap-2">
          <p className="text-base font-bold leading-snug" style={{ color: '#f2ece4' }}>
            {rec.name}
          </p>
          <span className="flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{
              background: `${accent}18`,
              border: `1px solid ${accent}35`,
              color: accent,
            }}>
            {rec.price}
          </span>
        </div>

        {/* Note pills */}
        <div className="flex flex-wrap gap-1.5">
          {(rec.notes || []).map(note => (
            <span key={note}
              className="text-[11px] px-2.5 py-1 rounded-full capitalize font-medium"
              style={{
                background: `${NOTE_COLORS[note] || '#888'}12`,
                border: `1px solid ${NOTE_COLORS[note] || '#888'}28`,
                color: `${NOTE_COLORS[note] || '#888'}bb`,
              }}>
              {note}
            </span>
          ))}
        </div>

        {/* Reason */}
        <p className="text-sm leading-relaxed pt-3"
          style={{
            color: 'rgba(242,236,228,0.45)',
            borderTop: '1px solid rgba(255,255,255,0.05)',
          }}>
          {rec.reason}
        </p>

      </div>
    </motion.div>
  )
}

export default function Results({ userPrefs, onRestart }) {
  const [recommendations, setRecommendations] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const getRecommendations = async () => {
      try {
        const response = await fetch('https://fumi-dir8.onrender.com/recommend', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userPrefs })
        })
        const parsed = await response.json()
        setRecommendations(parsed)
        setLoading(false)
      } catch (err) {
        console.error(err)
        setError(true)
        setLoading(false)
      }
    }
    getRecommendations()
  }, [])

  if (loading) {
    return (
      <motion.div
        className="w-full max-w-xs mx-auto pt-12 text-center"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="text-4xl mb-5 inline-block"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
        >
          🌿
        </motion.div>
        <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(200,110,40,0.7)' }}>
          Finding your scent
        </p>
        <h2 className="text-2xl font-bold mb-1" style={{ color: '#f2ece4' }}>Fumi is thinking…</h2>
        <p className="text-sm" style={{ color: 'rgba(242,236,228,0.3)' }}>
          Matching your vibe to the perfect bottle ✨
        </p>
      </motion.div>
    )
  }

  if (error || !recommendations) {
    return (
      <div className="w-full max-w-xs mx-auto pt-12">
        <div className="text-4xl mb-4">😕</div>
        <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(220,80,80,0.6)' }}>
          Something went wrong
        </p>
        <h2 className="text-2xl font-bold mb-2" style={{ color: '#f2ece4' }}>Couldn't load results</h2>
        <p className="text-sm mb-6" style={{ color: 'rgba(242,236,228,0.3)' }}>
          Make sure your server is running and try again.
        </p>
        <button onClick={onRestart}
          className="w-full py-3 rounded-2xl text-sm transition-all"
          style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(242,236,228,0.4)' }}>
          ← Start over
        </button>
      </div>
    )
  }

  return (
    <div className="w-full">
      <motion.div
        className="mb-7"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'rgba(200,110,40,0.7)' }}>
          your matches
        </p>
        <h2 className="text-2xl font-bold" style={{ color: '#f2ece4' }}>
          Here's what fumi found!
        </h2>
        <p className="text-sm mt-1" style={{ color: 'rgba(242,236,228,0.3)' }}>
          Matched to your style and the Philippine climate.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {recommendations.map((rec, i) => (
          <PerfumeCard key={i} rec={rec} index={i} />
        ))}
      </div>

      <motion.button
        onClick={onRestart}
        className="cursor-pointer mt-8 w-full py-3.5 rounded-2xl text-sm font-medium transition-all"
        style={{ border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(242,236,228,0.3)' }}
        whileHover={{ borderColor: 'rgba(255,255,255,0.18)', color: 'rgba(242,236,228,0.6)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        ← Try again with different preferences
      </motion.button>
    </div>
  )
}