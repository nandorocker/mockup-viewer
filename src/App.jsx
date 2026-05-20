import { useState, useEffect } from 'react'
import Landing from './Landing.jsx'
import Viewer from './Viewer.jsx'

function parseHash(hash) {
  // hash is like "#/venue-teaser" or "" or "#/"
  const stripped = hash.replace(/^#\/?/, '')
  return stripped || null // null means landing
}

export default function App() {
  const [conceptId, setConceptId] = useState(() => parseHash(window.location.hash))

  useEffect(() => {
    function onHashChange() {
      setConceptId(parseHash(window.location.hash))
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  function navigateTo(id) {
    window.location.hash = id ? `/${id}` : '/'
  }

  if (conceptId) {
    return <Viewer initialConceptId={conceptId} onBack={() => navigateTo(null)} onConceptChange={(id) => navigateTo(id)} />
  }
  return (
    <div className="desktop-phone-stage desktop-phone-stage--landing">
      <div className="desktop-phone-shell">
        <Landing onSelect={(id) => navigateTo(id)} />
      </div>
    </div>
  )
}
