import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Step1Budget from './components/steps/Step1Budget'
import Step2Occasion from './components/steps/Step2Occasion'
import Step3Notes from './components/steps/Step3Notes'
import Step4Gender from './components/steps/Step4Gender'
import Results from './components/Results'
import Landing from './components/Landing'

function FumiLogo() {
  return (
    <div className="flex items-baseline gap-0.5">
      <span
        className="font-black tracking-tight"
        style={{
          fontSize: '1.7rem',
          lineHeight: 1,
          background: 'linear-gradient(135deg, #f2ece4 30%, rgba(200,110,40,0.9) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.02em',
        }}
      >
        fumi
      </span>
      <span className="font-black" style={{ fontSize: '1.3rem', lineHeight: 1, color: 'rgba(200,110,40,0.85)' }}>
        ✦
      </span>
    </div>
  )
}

// Subtle background bottles carried into the step pages
function StepBackground() {
  const bottles = [
    { src: '/images/afnan-9pm.avif',        style: { top: '12%',   left: '4%',  width: 280, rotate: -22 } },
    { src: '/images/lattafa-yara.avif',     style: { top: '30%',   right: '0%', width: 260, rotate: -15   } },
    { src: '/images/acqua-di-gio-edp.avif',       style: { bottom: '-5%',left: '25%',   width: 270, rotate: 10 } },
    { src: '/images/prada-paradoxe.avif',       style: { bottom: '-1%',right: '25%',   width: 270, rotate: -10 } }
  ]

  return (
    <>
      {bottles.map((b, i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none select-none"
          style={{ top: b.style.top, left: b.style.left, right: b.style.right, bottom: b.style.bottom, width: b.style.width, rotate: b.style.rotate, zIndex: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1, duration: 1.2 }}
        >
          <img
            src={b.src}
            style={{ width: '100%', height: 'auto', filter: 'blur(6px) brightness(0.25)', objectFit: 'contain' }}
            onError={(e) => { e.target.style.display = 'none' }}
          />
        </motion.div>
      ))}
    </>
  )
}

export default function App() {
  const [showLanding, setShowLanding] = useState(true)
  const [currentStep, setCurrentStep] = useState(1)
  const [userPrefs, setUserPrefs] = useState({
    budget: '',
    occasion: [],
    notes: [],
    gender: '',
  })
  const [showResults, setShowResults] = useState(false)

  const updatePrefs = (field, value) => {
    setUserPrefs(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => setCurrentStep(s => s + 1)
  const prevStep = () => setCurrentStep(s => s - 1)

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: '#0d0b09' }}>

      {/* Global ambient orbs */}
      <div className="fixed w-96 h-96 rounded-full top-[-100px] left-[-80px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(200,110,40,0.12) 0%, transparent 70%)', zIndex: 0 }} />
      <div className="fixed w-72 h-72 rounded-full bottom-[-60px] right-[-40px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(100,60,160,0.08) 0%, transparent 70%)', zIndex: 0 }} />

      <AnimatePresence mode="wait">

        {showLanding && (
          <Landing key="landing" onBegin={() => setShowLanding(false)} />
        )}

        {!showLanding && (
          <motion.div
            key="app"
            className="flex flex-col min-h-screen px-4 pt-8 relative"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >

            {/* Subtle bottle background for step pages */}
            <StepBackground />

            {/* Warm center glow */}
            <div className="fixed inset-0 pointer-events-none" style={{
              background: 'radial-gradient(ellipse 50% 40% at 50% 55%, rgba(200,110,40,0.07) 0%, transparent 70%)',
              zIndex: 0,
            }} />

            {/* Header */}
            <div
              className="relative w-full flex flex-col items-center mb-8 cursor-pointer"
              style={{ zIndex: 10 }}
              onClick={() => {
                setShowLanding(true)
                setShowResults(false)
                setCurrentStep(1)
                setUserPrefs({ budget: '', occasion: [], notes: [], gender: '' })
              }}
            >
              <FumiLogo />
            </div>

            {/* Progress dots */}
            {!showResults && (
              <div className="relative w-full max-w-sm mx-auto flex gap-2 mb-8" style={{ zIndex: 10 }}>
                {[1, 2, 3, 4].map(step => (
                  <div
                    key={step}
                    className="h-1 flex-1 rounded-full transition-all duration-500"
                    style={{
                      background:
                        step < currentStep  ? '#d4721f' :
                        step === currentStep ? 'rgba(212,114,31,0.45)' :
                        'rgba(255,255,255,0.08)',
                    }}
                  />
                ))}
              </div>
            )}

            {/* Steps */}
            <div className="flex-1 relative" style={{ zIndex: 10 }}>
              {!showResults && (
                <div className="w-full max-w-sm mx-auto">
                  <AnimatePresence mode="wait">
                    {currentStep === 1 && (
                      <Step1Budget key="step1" value={userPrefs.budget} onSelect={(v) => updatePrefs('budget', v)} onNext={nextStep} />
                    )}
                    {currentStep === 2 && (
                      <Step2Occasion key="step2" value={userPrefs.occasion} onSelect={(v) => updatePrefs('occasion', v)} onNext={nextStep} onBack={prevStep} />
                    )}
                    {currentStep === 3 && (
                      <Step3Notes key="step3" value={userPrefs.notes} onSelect={(v) => updatePrefs('notes', v)} onNext={nextStep} onBack={prevStep} />
                    )}
                    {currentStep === 4 && (
                      <Step4Gender key="step4" value={userPrefs.gender} onSelect={(v) => updatePrefs('gender', v)} onBack={prevStep} onSubmit={() => setShowResults(true)} />
                    )}
                  </AnimatePresence>
                </div>
              )}

              <AnimatePresence mode="wait">
                {showResults && (
                  <div key="results" className="w-full max-w-5xl mx-auto px-2">
                    <Results
                      userPrefs={userPrefs}
                      onRestart={() => {
                        setShowResults(false)
                        setCurrentStep(1)
                        setUserPrefs({ budget: '', occasion: [], notes: [], gender: '' })
                      }}
                    />
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="relative w-full flex flex-col items-center gap-1 py-8 mt-8" style={{ zIndex: 10 }}>
              <div className="w-6 h-px mb-2" style={{ background: 'rgba(255,255,255,0.08)' }} />
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.15)' }}>
                © 2026 Jericho Sineneng · Perfume images sourced from{' '}
                <a href="https://www.fragrantica.com" target="_blank" rel="noopener noreferrer"
                  style={{ color: 'rgba(255,255,255,0.25)', textDecoration: 'underline' }}>
                  Fragrantica
                </a>
              </p>
            </div>

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}