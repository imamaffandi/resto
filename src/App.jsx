import React from "react";
import { Navbar, Home, Event, Menu, Footer } from "./components";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter className="overflow-x-hidden">
      <Navbar />
      <Home />
      <Event />
      <Menu />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
