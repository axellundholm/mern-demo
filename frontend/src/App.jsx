import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateCustomer from "./pages/CreateCustomer";
import ShowCustomer from "./pages/ShowCustomer";
import DeleteCustomer from "./pages/DeleteCustomer";
import Playground from "./pages/Playground";

const App = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/customers/create" element={<CreateCustomer />} />
      <Route path="/customers/details/:id" element={<ShowCustomer />} />
      <Route path="/customers/delete/:id" element={<DeleteCustomer />} />
      <Route path="/" element={<Playground />} />
    </Routes>
  );
};

export default App;
