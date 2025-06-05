import React from "react";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import StoreProvide from "./context/StoreProvide";
import Footer from "./pages/Footer/Footer";
import Cart from "./pages/Cart/Cart";
const App = () => {
  return (
    <StoreProvide>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
        <Footer/>
    </StoreProvide>
  );
};

export default App;
