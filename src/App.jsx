import React from "react";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import StoreProvide from "./context/StoreProvide";
import Footer from "./pages/Footer/Footer";
import Cart from "./pages/Cart/Cart";
import FirebaseProvider from "./context/Firebase/FirebaseProvider";
import { ToastContainer } from "react-toastify";
const App = () => {
  return (
    <FirebaseProvider>
      <StoreProvide>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
        <Footer />
         <ToastContainer position="top-right" autoClose={3000} />
      </StoreProvide>
    </FirebaseProvider>
  );
};

export default App;
