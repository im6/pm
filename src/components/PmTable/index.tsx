"use client";

const PmTable = ({
  rows,
  onDelete,
  onEditNote,
  onOpenFolder,
  onClickTable,
}: {
  rows: any[];
  onDelete?: any;
  onEditNote?: any;
  onOpenFolder?: any;
  onClickTable?: any;
}) => {
  const handleDelete = (thisRow: any) => () => {
    onDelete(thisRow);
  };
  const handleClickFolder = (thisRow: any) => () => {
    onOpenFolder(thisRow);
  };
  const handleClickNote = (thisRow: any) => () => {
    onEditNote(thisRow);
  };
  if (!Array.isArray(rows)) return null;
  return (
    <div className="relative overflow-x-auto" onClick={onClickTable}>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 w-1/12">
              ID
            </th>
            <th scope="col" className="px-6 py-3 w-1/12">
              Size
            </th>
            <th scope="col" className="px-6 py-3 w-7/12">
              DIR
            </th>
            <th scope="col" className="px-6 py-3 w-3/12">
              Action
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
                <span title={v.id}>{v.sid}</span>
              </th>
              <td className="px-6 py-4">{v.size}</td>
              <td className="px-6 py-4">
                <div className="inline-block min-w-6">
                  {v.isMounted && <span className="mr-1">&#129513;</span>}
                </div>
                {v.path} <span className="text-lime-600 ml-2">{v.note}</span>
              </td>
              <td>
                {onOpenFolder && (
                  <button
                    type="button"
                    onClick={handleClickFolder(v)}
                    className="px-3 py-2 ml-2 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Folder
                  </button>
                )}
                {onEditNote && (
                  <button
                    type="button"
                    onClick={handleClickNote(v)}
                    className="px-3 py-2 ml-2 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Note
                  </button>
                )}
                {onDelete && (
                  <button
                    type="button"
                    disabled={!onDelete}
                    onClick={handleDelete(v)}
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded text-xs px-3 py-2 ml-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PmTable;
