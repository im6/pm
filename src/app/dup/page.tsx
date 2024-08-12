"use client";
import { useState, useEffect } from "react";
import PmTable from "../../components/PmTable/index";

const DupHome = () => {
  const [data, setData] = useState();
  useEffect(() => {
    fetch("/api/show-dup", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
      });
  }, []);
  return (
    <div className="my-4">
      {Array.isArray(data) &&
        data.map((v, k) => (
          <div className="my-3">
            <PmTable key={k} rows={v} />
          </div>
        ))}
    </div>
  );
};
export default DupHome;
