import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { getCustomer, updateCustomer } from "../api/customers";

const EditCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [legalEntityId, setLegalEntityId] = useState("");
  const [accountHolderId, setAccountHolderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getCustomer(id)
      .then((res) => {
        setLegalEntityId(res.data.legalEntityId);
        setAccountHolderId(res.data.accountHolderId);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to load customer");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleSaveCustomer = () => {
    setSaving(true);
    setError(null);
    updateCustomer(id, { legalEntityId, accountHolderId })
      .then(() => {
        navigate(`/customers/details/${id}`);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to update customer");
      })
      .finally(() => {
        setSaving(false);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="my-4 text-3xl">Edit customer</h1>

      {loading ? (
        <Spinner />
      ) : (
        <div className="mx-auto flex w-[600px] flex-col rounded-xl border-2 border-sky-400 p-4">
          {error && (
            <p className="mb-4 rounded-md border border-red-400 bg-red-50 p-4 text-red-700">
              {error}
            </p>
          )}
          <div className="my-4">
            <label className="mr-4 text-xl text-gray-500">
              Legal entity Id
            </label>
            <input
              type="text"
              value={legalEntityId}
              onChange={(e) => setLegalEntityId(e.target.value)}
              className="w-full border-2 border-gray-500 px-4 py-2"
            />
          </div>
          <div className="my-4">
            <label className="mr-4 text-xl text-gray-500">
              Account holder Id
            </label>
            <input
              type="text"
              value={accountHolderId}
              onChange={(e) => setAccountHolderId(e.target.value)}
              className="w-full border-2 border-gray-500 px-4 py-2"
            />
          </div>
          <button
            className="m-8 flex justify-center bg-sky-300 p-2"
            onClick={handleSaveCustomer}
            disabled={saving}
          >
            {saving && <ArrowPathIcon className="mx-1.5 h-5 animate-spin" />}
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default EditCustomer;
