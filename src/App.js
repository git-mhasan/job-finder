import React from 'react';
import Home from './page/Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavMenu from './components/NavMenu';
import AddJob from './page/AddJob';
import Header from './components/Header';
import EditJob from './page/EditJob';


function App() {
  return (
    <Router>
      <Header />
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 md:px-8 ">
        <NavMenu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-job" element={<AddJob />} />
          <Route path="/edit-job/:jobId" element={<EditJob />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
