import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import {useState} from "react";
import My404 from './components/My404';
import NoteInput from './components/NoteInput';
import Topics from './components/Topics';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h1>Notebook</h1>
      <Router>
        <Link className="page-link" to="/">Home</Link> 
        <Link className='page-link' to="/topics">Notes</Link>
        <hr/>
        <Routes>
          <Route path="/" element={<NoteInput/>}></Route>
          <Route path="/topics" element={<Topics />}></Route>
          <Route path="*" element={<My404 />}></Route>
        </Routes>
      </Router>
      <hr/>
      </header>
    </div>
  );
}

export default App;
