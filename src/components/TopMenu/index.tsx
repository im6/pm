"use client";
import React from "react";
import { useState } from "react";

const TopMenu = () => {
  const [scanDisable, setScanDisable] = useState(false);
  const onClickScan = () => {
    setScanDisable(true);
    fetch("/api/scan", {
      method: "POST",
    })
      .then((res) => res.json())
      .then(() => {
        setScanDisable(false);
      });
  };
  const onClickCombine = () => {
    fetch("/api/combine", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        // todo
      });
  };
  const onClickCreatePid = () => {
    fetch("/api/create-id", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("xx data", data);
      });
  };

  return (
    <div className="m-4 flex">
      <a href="/">
        <input
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-30 mr-3"
          id="searchBox"
          type="text"
          placeholder="keyword"
        />
      </a>
      <a href="/dup">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3">
          Show Dup
        </button>
      </a>
      <a href="/display-all">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3">
          Show All
        </button>
      </a>
      <button
        onClick={onClickScan}
        disabled={scanDisable}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3 disabled:bg-slate-300"
      >
        {scanDisable ? <span>&#128336;</span> : "Scan"}
      </button>
      <button
        onClick={onClickCombine}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3"
      >
        Combine to folder
      </button>
      <button
        onClick={onClickCreatePid}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create PM ID
      </button>
    </div>
  );
};

export default TopMenu;
