import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Używamy Routes zamiast Switch
import Home from "./pages/Home";
import Reservation from "./pages/Reservation";
import Login from "./pages/Login";
// import Signup from "./pages/Signup";

const App = () => {
  return (
    <Router>
      <Routes> {/* Używamy Routes, nie Switch */}
        <Route path="/" element={<Home />} />
        <Route path="/reservation/:id" element={<Reservation />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/signup" element={<Signup />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
