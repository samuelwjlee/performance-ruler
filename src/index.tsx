import ReactDOM from 'react-dom'
import React, { useEffect, useRef, useState } from 'react'
import './index.css'

const MOCK_API_RESPONSE_SPEED = 1000

/**
 * hook performance marker anywhere with custom name
 */
function usePerformanceRuler(name: string) {
  const start = `${name}-start`
  const end = `${name}-end`
  return {
    startMarker: () => performance.mark(start),
    endMarker: () => performance.mark(end),
    /* fire analytics here if desired */
    measure: () => performance.measure(name, start, end),
  }
}

function Terminal({ loading }: { loading: boolean }) {
  const [report, setReport] = useState('loading...')
  const { measure, endMarker } = usePerformanceRuler('page-load')

  useEffect(() => {
    if (!loading) {
      /**
       * loading complete 🎉
       * At this point, the page should be fully interactive
       */
      endMarker()

      setReport(JSON.stringify(measure(), null, 2))
    }
  }, [loading])

  return (
    <code className="Code">
      <pre>{report}</pre>
    </code>
  )
}

function App() {
  const [loaded, setLoaded] = useState(false)
  const { startMarker } = usePerformanceRuler('page-load')

  let timeoutId = useRef<null | NodeJS.Timeout>(null)

  useEffect(() => {
    /**
     * loading started 🏁.!
     * this could be when user hits landing page url,
     * clicks a button to navigate to a page, etc
     */
    startMarker()

    timeoutId.current = setTimeout(() => {
      setLoaded((loaded) => !loaded)

      if (timeoutId.current) {
        clearTimeout(timeoutId.current)
      }
    }, MOCK_API_RESPONSE_SPEED)
  })

  return (
    <div className="App">
      <Terminal loading={!loaded} />
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
