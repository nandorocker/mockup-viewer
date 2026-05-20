// src/Viewer.jsx
import { useState, useRef, useCallback, useEffect } from 'react'
import { flatSlides, firstSlideIndex } from './concepts.js'
import Toast from './Toast.jsx'

const SWIPE_THRESHOLD = 50 // px
const ANIMATION_DURATION = 300 // ms — must match CSS

export default function Viewer({ initialConceptId, onBack, onConceptChange }) {
  const globalIndexRef = useRef(firstSlideIndex(initialConceptId))
  const [globalIndex, setGlobalIndex] = useState(globalIndexRef.current)
  const [prevIndex, setPrevIndex] = useState(null)
  const [slideDirection, setSlideDirection] = useState(null) // 'left' | 'right'
  // toastMode: 'hidden' | 'auto' | 'manual'
  const [toastMode, setToastMode] = useState('auto')
  const autoHideTimer = useRef(null)
  const animationTimer = useRef(null)
  const touchStartX = useRef(null)

  const currentSlide = flatSlides[globalIndex]

  // --- Toast helpers ---
  function clearAutoTimer() {
    if (autoHideTimer.current) {
      clearTimeout(autoHideTimer.current)
      autoHideTimer.current = null
    }
  }

  function showToastAuto() {
    clearAutoTimer()
    setToastMode('auto')
    autoHideTimer.current = setTimeout(() => setToastMode('hidden'), 2000)
  }

  function handleScreenTap() {
    clearAutoTimer()
    if (toastMode === 'hidden') {
      setToastMode('manual')
    } else {
      setToastMode('hidden')
    }
  }

  // Show toast on mount
  useEffect(() => {
    showToastAuto()
    return () => {
      clearAutoTimer()
      if (animationTimer.current) clearTimeout(animationTimer.current)
    }
  }, [])

  // Preload adjacent slides for smooth swiping
  useEffect(() => {
    const indices = [globalIndex - 1, globalIndex + 1].filter(
      (i) => i >= 0 && i < flatSlides.length
    )
    indices.forEach((i) => {
      const img = new Image()
      img.src = `/images/${flatSlides[i].filename}`
    })
  }, [globalIndex])

  // --- Navigation ---
  const navigate = useCallback((delta) => {
    const currentIdx = globalIndexRef.current
    const next = currentIdx + delta
    if (next < 0 || next >= flatSlides.length) return

    const dir = delta > 0 ? 'left' : 'right'
    setPrevIndex(currentIdx)
    setSlideDirection(dir)
    setGlobalIndex(next)
    globalIndexRef.current = next

    // Clear prev frame after animation completes
    if (animationTimer.current) clearTimeout(animationTimer.current)
    animationTimer.current = setTimeout(() => setPrevIndex(null), ANIMATION_DURATION)

    const nextSlide = flatSlides[next]
    if (nextSlide.conceptId !== flatSlides[currentIdx].conceptId) {
      onConceptChange(nextSlide.conceptId)
    }

    showToastAuto()
  }, [onConceptChange])

  // --- Touch handling ---
  function onTouchStart(e) {
    touchStartX.current = e.touches[0].clientX
  }

  function onTouchEnd(e) {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null

    if (Math.abs(dx) >= SWIPE_THRESHOLD) {
      clearAutoTimer()
      navigate(dx < 0 ? 1 : -1)
    } else {
      handleScreenTap()
    }
  }

  const toastVisible = toastMode !== 'hidden'

  return (
    <div
      className="viewer"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Outgoing frame — animates out */}
      {prevIndex !== null && (
        <div className={`viewer-frame exiting-${slideDirection}`}>
          <img className="viewer-bg" src="/images/linkedin_tester.png" alt="" draggable={false} />
          <img className="viewer-mockup" src={`/images/${flatSlides[prevIndex].filename}`} alt="" draggable={false} />
        </div>
      )}
      {/* Incoming frame — animates in */}
      <div className={slideDirection ? `viewer-frame entering-${slideDirection}` : 'viewer-frame'}>
        <img className="viewer-bg" src="/images/linkedin_tester.png" alt="" draggable={false} />
        <img className="viewer-mockup" src={`/images/${currentSlide.filename}`} alt={currentSlide.conceptName} draggable={false} />
      </div>
      <Toast
        conceptName={currentSlide.conceptName}
        visible={toastVisible}
        onBack={onBack}
      />
    </div>
  )
}
