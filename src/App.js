import React from 'react';
import Navbar from "./components/Navbar/Navbar"
import Waiting from "./components/Waiting/Waiting"
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Waiting />
    </div>
  );
}

export default App;
