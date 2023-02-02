import { useState } from 'react';
import './App.css';
import SymbolsList from './components/symbols-list';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='App'>
      <h1>Simple DTrader</h1>
      <SymbolsList />
    </div>
  );
}

export default App;
