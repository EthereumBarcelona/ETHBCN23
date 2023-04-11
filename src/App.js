import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./pages/profile";
import "./App.css";
import Mint from "./pages/mint";
import Redeem from "./pages/redeem";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Profile />} />
          <Route exact path="/mint" element={<Mint />} />
          <Route exact path="/redeem" element={<Redeem />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
