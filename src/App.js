import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css";

// you can see we have to import all names of the components and theen located the component
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import EditExercise from  "./components/EditExercise";
import CreateUser from "./components/CreateUser";


function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        {/* <Route path="/EditExercise" element={<EditExercise />} /> */}
        <Route path='/user' element={<CreateUser />} />
      </Routes>
    </Router>
  );
}

export default App;