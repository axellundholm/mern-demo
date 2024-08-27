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
      <h1 className="my-4 text-3xl"> Show Customer</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex w-fit flex-col rounded-xl border-2 border-sky-400 p-4">
          <div className="my-4">
            <span className="mr-4 text-xl text-gray-500">Id</span>
            <span>{customer._id}</span>
          </div>
          <div className="my-4">
            <span className="mr-4 text-xl text-gray-500">Legal Entity Id</span>
            <span>{customer.legalEntityId}</span>
          </div>
          <div className="my-4">
            <span className="mr-4 text-xl text-gray-500">
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
