import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowCustomer = () => {
  const [customer, setCustomer] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/customers/${id}`)
      .then((res) => {
        setCustomer(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4"> Show Customer</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Id</span>
            <span>{customer._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Legal Entity Id</span>
            <span>{customer.legalEntityId}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">
              Account Holder Id
            </span>
            <span>{customer.accountHolderId}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowCustomer;
