import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import SkillOffer from "./components/SkillOffer";
import SkillSearch from "./components/SkillSearch";
import TradeRequests from "./components/TradeRequests";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<SkillSearch />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/offer" element={<SkillOffer />} />
          <Route path="/trades" element={<TradeRequests />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
