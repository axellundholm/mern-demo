import { useCallback, useEffect, useState } from "react";
import { getCustomers } from "../api/customers";

export function useCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refetch = useCallback(() => {
    setLoading(true);
    setError(null);
    return getCustomers()
      .then((res) => {
        setCustomers(res.data.data);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to load customers");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { customers, loading, error, refetch };
}
