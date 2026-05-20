// src/Toast.jsx

/**
 * Toast overlay — concept name label + back button.
 *
 * Props:
 *   conceptName  string   — label text
 *   visible      boolean  — whether overlay is shown
 *   onBack       fn       — called when back button tapped
 */
export default function Toast({ conceptName, visible, onBack }) {
  return (
    <div className={`toast-overlay${visible ? ' visible' : ''}`}>
      <button
        className={`toast-back-btn toast-fade${visible ? ' show' : ''}`}
        onTouchEnd={(e) => { e.stopPropagation(); onBack() }}
        onClick={onBack}
        aria-label="Back to concepts"
      >
        ←
      </button>
      <div className={`toast-label toast-fade${visible ? ' show' : ''}`}>
        {conceptName}
      </div>
    </div>
  )
}
