import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateCustomer from "./pages/CreateCustomer";
import ShowCustomer from "./pages/ShowCustomer";
import EditCustomer from "./pages/EditCustomer";
import DeleteCustomer from "./pages/DeleteCustomer";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/customers/create" element={<CreateCustomer />} />
      <Route path="/customers/details/:id" element={<ShowCustomer />} />
      <Route path="/customers/edit/:id" element={<EditCustomer />} />
      <Route path="/customers/delete/:id" element={<DeleteCustomer />} />
    </Routes>
  );
};

export default App;
