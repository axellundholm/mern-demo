import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const createCustomer = () => {
  const [type, setType] = useState("");
  const [legalName, setLegalName] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSaveCustomer = () => {
    const data = {
      type,
      organization: {
        legalName,
        registeredAddress: {
          country,
        },
      },
    };
    console.log(data);
    setLoading(true);
    axios
      .post("http://localhost:3000/customers", data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happend");
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="my-4 text-3xl">Create customer</h1>
      {loading && <Spinner />}
      <div className="mx-auto flex w-[600px] flex-col rounded-xl border-2 border-sky-400 p-4">
        <div className="my-4">
          <label className="mr-4 text-xl text-gray-500">Type</label>
          <input
            type="text"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
            className="w-full border-2 border-gray-500 px-4 py-2"
          />
        </div>
        <div className="my-4">
          <label className="mr-4 text-xl text-gray-500">Legal name</label>
          <input
            type="text"
            value={legalName}
            onChange={(e) => {
              setLegalName(e.target.value);
            }}
            className="w-full border-2 border-gray-500 px-4 py-2"
          />
        </div>
        <div className="my-4">
          <label className="mr-4 text-xl text-gray-500">Country</label>
          <input
            type="text"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
            className="w-full border-2 border-gray-500 px-4 py-2"
          />
        </div>
        <button className="m-8 bg-sky-300 p-2" onClick={handleSaveCustomer}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default createCustomer;
