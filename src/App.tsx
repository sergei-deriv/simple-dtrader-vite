import * as React from 'react';
// import './App.css';
import Chart from './components/chart';
import SymbolsList from './components/symbols-list';

function App() {
  return (
    // <div className='App'>
    <div>
      <h1>Simple DTrader</h1>
      <SymbolsList />
      <Chart />
    </div>
  );
}

export default App;
