import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateCustomer from "./pages/CreateCustomer";

const App = () => {
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/customers/create" element={<CreateCustomer />} />
  </Routes>;
};

export default App;
