import { useEffect, useState } from 'react'
import './App.css'
import { getFID } from 'web-vitals'

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
  const [FID, setFID] = useState(0)

  useEffect(() => {
    getFID((report) => setFID(report.delta))
  }, [])

  return (
    <div className="App">
      <div className="Terminal">
        {FID === 0 ? (
          'CLICK ANYWHERE'
        ) : (
          <>
            <LogRow label={'name'} val={perf.name} />
            <LogRow
              label={'TTI'}
              val={perf.domInteractive - perf.requestStart}
            />
            <LogRow label={'FID'} val={FID} />
          </>
        )}
      </div>
    </div>
  )
}

export default App
