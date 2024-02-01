import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import EachShow from './components/EachShow';
import Navbar from './components/Navbar';
import Singup from './components/Singup';
import BookShow from './components/BookShow';

function App() {

  return (
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/home" element={<Home></Home>}></Route>
          <Route path="/show/:id" element={<EachShow></EachShow>}></Route>
          <Route path="/signup" element={<Singup></Singup>}></Route>
          <Route path="/book/:id" element={<BookShow></BookShow>}></Route>
        </Routes>
      </Router>
  )
}

export default App
