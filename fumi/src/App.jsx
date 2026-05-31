import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Step1Budget from './components/steps/Step1Budget'
import Step2Occasion from './components/steps/Step2Occasion'
import Step3Notes from './components/steps/Step3Notes'
import Step4Gender from './components/steps/Step4Gender'
import Results from './components/Results'
import Landing from './components/Landing'

// Logo used in header — modern, friendly, consistent with Landing
function FumiLogo() {
  return (
    <div className="flex flex-col items-center gap-1.5">
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
        <span
          className="font-black"
          style={{ fontSize: '1.3rem', lineHeight: 1, color: 'rgba(200,110,40,0.85)' }}
        >
          ✦
        </span>
      </div>
    </div>
  )
}

export default function App() {
  const [showLanding, setShowLanding] = useState(true)
  const [currentStep, setCurrentStep] = useState(1)
  const [userPrefs, setUserPrefs] = useState({
    budget: '',
    occasion: [],   // now an array
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

      {/* Ambient orbs */}
      <div className="fixed w-96 h-96 rounded-full top-[-100px] left-[-80px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(200,110,40,0.12) 0%, transparent 70%)' }} />
      <div className="fixed w-72 h-72 rounded-full bottom-[-60px] right-[-40px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(100,60,160,0.08) 0%, transparent 70%)' }} />

      <AnimatePresence mode="wait">

        {showLanding && (
          <Landing key="landing" onBegin={() => setShowLanding(false)} />
        )}

        {!showLanding && (
          <motion.div
            key="app"
            className="flex flex-col min-h-screen px-4 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="relative z-10 w-full flex flex-col items-center mb-8">
              <FumiLogo />
            </div>

            {/* Progress bar */}
            {!showResults && (
              <div className="relative z-10 w-full max-w-sm mx-auto flex gap-2 mb-8">
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
            <div className="flex-1 relative z-10">
              {!showResults && (
                <div className="w-full max-w-sm mx-auto">
                  <AnimatePresence mode="wait">
                    {currentStep === 1 && (
                      <Step1Budget
                        key="step1"
                        value={userPrefs.budget}
                        onSelect={(v) => updatePrefs('budget', v)}
                        onNext={nextStep}
                      />
                    )}
                    {currentStep === 2 && (
                      <Step2Occasion
                        key="step2"
                        value={userPrefs.occasion}
                        onSelect={(v) => updatePrefs('occasion', v)}
                        onNext={nextStep}
                        onBack={prevStep}
                      />
                    )}
                    {currentStep === 3 && (
                      <Step3Notes
                        key="step3"
                        value={userPrefs.notes}
                        onSelect={(v) => updatePrefs('notes', v)}
                        onNext={nextStep}
                        onBack={prevStep}
                      />
                    )}
                    {currentStep === 4 && (
                      <Step4Gender
                        key="step4"
                        value={userPrefs.gender}
                        onSelect={(v) => updatePrefs('gender', v)}
                        onBack={prevStep}
                        onSubmit={() => setShowResults(true)}
                      />
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
            <div className="relative z-10 w-full flex flex-col items-center gap-1 py-8 mt-8">
              <div className="w-6 h-px mb-2" style={{ background: 'rgba(255,255,255,0.08)' }} />
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>© 2026 Jericho Sineneng</p>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}