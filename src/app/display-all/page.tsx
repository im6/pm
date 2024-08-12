"use client";
import { useState, useEffect } from "react";
import PmTable from "../../components/PmTable/index";

const DisplayAllHome = () => {
  const [data, setData] = useState();
  console.log("render");
  useEffect(() => {
    fetch("/api/show-all", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
      });
  }, []);
  return <div className="my-4">{<PmTable rows={data} />}</div>;
};
export default DisplayAllHome;
