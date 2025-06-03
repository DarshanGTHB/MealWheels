import React from "react";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import StoreProvide from "./context/StoreProvide";
const App = () => {
  return (
    <StoreProvide>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </StoreProvide>
  );
};

export default App;
