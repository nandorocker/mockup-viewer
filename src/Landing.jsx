// src/Landing.jsx
import { concepts } from './concepts.js'

export default function Landing({ onSelect }) {
  return (
    <div className="landing">
      <div className="landing-header">FUN26</div>
      <ul className="concept-list">
        {concepts.map((concept) => (
          <li
            key={concept.id}
            className="concept-card"
            onClick={() => onSelect(concept.id)}
          >
            <span className="concept-card-name">{concept.name}</span>
            {concept.slides.length > 1 && (
              <span className="concept-card-badge">{concept.slides.length} slides</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
