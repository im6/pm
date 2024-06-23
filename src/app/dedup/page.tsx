"use client";
import { useEffect } from "react";

const DedupHome = () => {
  const onClickScan = () => {
    fetch("/api/dedup", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("xx data", data);
      });
  };

  return (
    <div className="min-h-screen p-5">
      <div className="m-4 flex">
        <input
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-30 mr-5"
          id="searchBox"
          type="text"
          placeholder="keyword"
        />
        <button
          onClick={onClickScan}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Scan
        </button>
      </div>
    </div>
  );
};
export default DedupHome;
