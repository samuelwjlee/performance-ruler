import { useEffect } from 'react'
import './App.css'
import reportWebVitals from './reportWebVitals'

function getPerformanceEntry(): any {
  const perf = performance.getEntriesByType('navigation') || []
  return perf[0]
}

function LogRow({ label, val }: { label: string; val: number | string }) {
  return (
    <div className="Log">
      <strong>{'> '}</strong>
      <span>{`${label}: `}</span>
      <span>{typeof val === 'number' ? `${val} ms` : val}</span>
    </div>
  )
}

function App() {
  const perf = getPerformanceEntry()

  useEffect(() => {
    console.log(performance.getEntries())
    reportWebVitals((report) => {
      console.log(report)
    })
  }, [])

  return (
    <div className="App">
      <div className="Terminal">
        <LogRow label={'name'} val={perf.name} />
        <LogRow label={'startTime'} val={perf.startTime} />
        <LogRow label={'duration'} val={perf.duration} />
        <LogRow label={'TTI'} val={perf.domInteractive - perf.requestStart} />
      </div>
    </div>
  )
}

export default App
