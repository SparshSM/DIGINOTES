import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import Errorpage from "./components/Errorpage";
import NoteState from "./context/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/Alert";
import "./App.css";
import { useState } from "react";
import Footer from "./components/Footer";
function App() {
  const [alert,setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 3500);
}
  return (
    <>
    <NoteState>
      <Router>
      <Navbar />
      <Alert alert={alert} />
    <Routes>
      <Route path="/" element={<About showAlert={showAlert} />}/>
      <Route path="/mynotes" element={<Home showAlert={showAlert} />} />
      <Route path="/login" element={<Login showAlert={showAlert} />} />
      <Route path="/signup" element={<Signup showAlert={showAlert} />} />
      <Route path="*" element={<Errorpage />} />
    </Routes>
    <Footer />
  </Router>
  </NoteState></>
  );
}

export default App;
