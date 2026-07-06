import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { getCustomer } from "../api/customers";

const ShowCustomer = () => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    getCustomer(id)
      .then((res) => {
        setCustomer(res.data);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to load customer");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="my-4 text-3xl"> Show Customer</h1>
      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="rounded-md border border-red-400 bg-red-50 p-4 text-red-700">
          {error}
        </p>
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
