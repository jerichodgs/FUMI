const NOTE_CONFIG = {
  woody:   { bg: 'linear-gradient(160deg, #1a0e07 0%, #2e1a0a 60%, #100800 100%)', color: '#c4845a', emoji: '🪵' },
  earthy:  { bg: 'linear-gradient(160deg, #0f1208 0%, #1e2410 60%, #0a0d05 100%)', color: '#8fa85a', emoji: '🍂' },
  spicy:   { bg: 'linear-gradient(160deg, #1a0808 0%, #2e1010 60%, #100404 100%)', color: '#d46a4a', emoji: '🔥' },
  sweet:   { bg: 'linear-gradient(160deg, #180d1a 0%, #2a1530 60%, #100810 100%)', color: '#c47ad4', emoji: '🍬' },
  floral:  { bg: 'linear-gradient(160deg, #1a0a14 0%, #2e1020 60%, #100608 100%)', color: '#e07aaa', emoji: '🌸' },
  fresh:   { bg: 'linear-gradient(160deg, #081418 0%, #102430 60%, #050e10 100%)', color: '#5ac4d4', emoji: '🌿' },
  aquatic: { bg: 'linear-gradient(160deg, #06101a 0%, #0e1e30 60%, #040c14 100%)', color: '#5a9cd4', emoji: '🌊' },
  citrus:  { bg: 'linear-gradient(160deg, #181200 0%, #302200 60%, #100c00 100%)', color: '#d4b44a', emoji: '🍊' },
}

const DEFAULT = { bg: 'linear-gradient(160deg, #111 0%, #222 100%)', color: '#888', emoji: '✦' }

export default function ScentVisual({ notes = [] }) {
  const primary = NOTE_CONFIG[notes[0]] || DEFAULT
  const pills = notes.slice(0, 3).map(n => NOTE_CONFIG[n]).filter(Boolean)

  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: '200px',
      background: primary.bg,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      padding: '16px',
      boxSizing: 'border-box',
    }}>
      <div style={{ fontSize: '32px', marginBottom: '4px' }}>{primary.emoji}</div>
      {pills.map((p, i) => (
        <div key={i} style={{
          fontSize: '11px',
          padding: '4px 12px',
          borderRadius: '20px',
          background: `${p.color}22`,
          border: `1px solid ${p.color}44`,
          color: p.color,
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 500,
          letterSpacing: '0.04em',
          textTransform: 'capitalize',
          whiteSpace: 'nowrap',
        }}>
          {notes[i]}
        </div>
      ))}
    </div>
  )
}