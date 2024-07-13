import Sineup from './Sineup';
import Login from './Login';
import { Link } from 'react-router-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Task from './Task';
import Home from './Home';
import './App.css';

function App() {
  return (
    <div className="App">
      
      
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/register" element={<Sineup/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/task" element={<Task/>}></Route>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
