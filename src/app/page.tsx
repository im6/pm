"use client";
import { useState, useEffect, useRef } from "react";

const Home = () => {
  const inputRef = useRef();
  const [search, setSearch] = useState("");
  const handleSubmit = (evt: any) => {
    evt.preventDefault();
    window.location.href = `/search/${search}`;
  };
  const handleSearchChange = (evt: any) => {
    setSearch(evt.target.value);
  };
  useEffect(() => {
    inputRef!.current!.focus();
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form className="mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="large-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Search
          </label>
          <input
            type="text"
            value={search}
            ref={inputRef}
            id="large-input"
            onChange={handleSearchChange}
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-white text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </form>
    </main>
  );
};
export default Home;
