import './App.css';

function getResourceEntry() {
  const metric = window.performance.getEntriesByType('resource')[0];

  return JSON.stringify(metric);
}

function App() {
  return (
    <div className="App">
      <div className="Code">
        {getResourceEntry()}
      </div>
    </div>
  );
}

export default App;
