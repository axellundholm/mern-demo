import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import BackButton from "../components/BackButton";
import { deleteCustomer } from "../api/customers";

const DeleteCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = () => {
    setLoading(true);
    setError(null);
    deleteCustomer(id)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to delete customer");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="my-4 text-3xl">Delete customer</h1>

      <div className="mx-auto flex w-[600px] flex-col rounded-xl border-2 border-red-400 p-8">
        {error && (
          <p className="mb-4 rounded-md border border-red-400 bg-red-50 p-4 text-red-700">
            {error}
          </p>
        )}
        <span className="text-xl">
          Are you sure you want to delete this customer?
        </span>
        <button
          className="m-8 flex justify-center bg-red-600 p-2 text-white"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading && <ArrowPathIcon className="mx-1.5 h-5 animate-spin" />}
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteCustomer;
