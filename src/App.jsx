import React from "react";
import { Navbar, Home, Event, Menu, Wifi, Footer } from "./components";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter className="overflow-x-hidden">
      <Navbar />
      <Home />
      <Event />
      <Menu />
      <Wifi />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
