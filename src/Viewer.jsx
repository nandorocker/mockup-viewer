// src/Viewer.jsx
import { useState, useRef, useCallback, useEffect } from 'react'
import { flatSlides, firstSlideIndex } from './concepts.js'
import Toast from './Toast.jsx'

const SWIPE_THRESHOLD = 50 // px

export default function Viewer({ initialConceptId, onBack, onConceptChange }) {
  const [globalIndex, setGlobalIndex] = useState(() => firstSlideIndex(initialConceptId))
  // toastMode: 'hidden' | 'auto' | 'manual'
  const [toastMode, setToastMode] = useState('auto')
  const [slideDirection, setSlideDirection] = useState(null) // 'left' | 'right' | null
  const autoHideTimer = useRef(null)
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
    return () => clearAutoTimer()
  }, [])

  // --- Navigation ---
  const navigate = useCallback((delta) => {
    setSlideDirection(delta > 0 ? 'left' : 'right')
    setGlobalIndex((prev) => {
      const next = prev + delta
      if (next < 0 || next >= flatSlides.length) return prev
      const nextSlide = flatSlides[next]
      if (nextSlide.conceptId !== flatSlides[prev].conceptId) {
        onConceptChange(nextSlide.conceptId)
      }
      return next
    })
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
      // swipe
      clearAutoTimer()
      navigate(dx < 0 ? 1 : -1)
    } else {
      // tap
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
      <img
        className="viewer-bg"
        src="/images/linkedin_tester.png"
        alt=""
        draggable={false}
      />
      <img
        key={currentSlide.filename}
        className={`viewer-mockup${slideDirection ? ` slide-${slideDirection}` : ''}`}
        src={`/images/${currentSlide.filename}`}
        alt={currentSlide.conceptName}
        draggable={false}
      />
      <Toast
        conceptName={currentSlide.conceptName}
        visible={toastVisible}
        onBack={onBack}
      />
    </div>
  )
}
