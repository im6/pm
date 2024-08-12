import React from "react";

const PmTable = ({ rows }) => {
  if (!Array.isArray(rows)) return null;
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 w-48">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              DIR
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((v) => (
            <tr
              key={v.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {v.sid}
              </th>
              <td className="px-6 py-4">{v.path}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PmTable;
