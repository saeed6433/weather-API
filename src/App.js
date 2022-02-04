import React from 'react';
import './App.css';
import Forecast from "./components/Forecast";

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
      <h1>React Weather App</h1>
      </header>
      <main>
        <Forecast/>
      </main>
      <footer>
        Created by SaeedJei
      </footer>
    </div>
  );
}

export default App;
