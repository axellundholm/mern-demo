import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { ArrowPathIcon } from "@heroicons/react/20/solid";

const Home = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/customers")
      .then((res) => {
        setCustomers(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h1 className="my-8 text-3xl"> Customers List</h1>
        <Link to="/customers/create">
          <MdOutlineAddBox className="text-4xl text-sky-800" />
        </Link>
      </div>
      {loading ? (
        <ArrowPathIcon className="h-10 w-10 animate-spin" />
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="rounded-md border border-slate-600">No</th>
              <th className="rounded-md border border-slate-600 max-md:hidden">
                Account Holder Id
              </th>
              <th className="rounded-md border border-slate-600">
                Legal Entity Id
              </th>
              <th className="rounded-md border border-slate-600">Operations</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={customer._id} className="h-8">
                <td className="rounded-md border border-slate-700 text-center">
                  {index + 1}
                </td>
                <td className="rounded-md border border-slate-700 text-center max-md:hidden">
                  {customer.accountHolderId}
                </td>
                <td className="rounded-md border border-slate-700 text-center">
                  {customer.legalEntityId}
                </td>
                <td className="rounded-md border border-slate-700 text-center">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/customers/details/${customer._id}`}>
                      <BsInfoCircle className="text-2xl text-green-800" />
                    </Link>
                    <Link to={`/customers/delete/${customer._id}`}>
                      <MdOutlineDelete className="text-2xl text-green-800" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
