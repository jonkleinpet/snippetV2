import React from 'react';
import { Route } from 'react-router-dom';
import Main from '../Main/Main';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <section id='main'>
        <Route exact path={ '/' } component={ Main } />
      </section>
    </div>
  );
}

export default App;
