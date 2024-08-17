"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import PmTable from "../../../components/PmTable/index";

const Search = () => {
  const [data, setData] = useState();
  const { keyword } = useParams();
  const handleDelete = (data: any) => {
    const confirmed = window.confirm(`Are you sure? ${data.sid}`);
    if (!confirmed) {
      return;
    }
    fetch("/api/delete-one", {
      method: "POST",
      body: JSON.stringify({ data }),
    })
      .then((res) => res.json())
      .then(() => {
        setData((oldData) => [...oldData].filter((v) => v.id !== data.id));
      });
  };
  const handleOpenFolder = (data: any) => {
    fetch("/api/open-directory", {
      method: "POST",
      body: JSON.stringify({ data }),
    })
      .then((res) => res.json())
      .then(({ error }) => {
        if (error) {
          alert("Open folder failed");
        }
      });
  };
  const handleEditNode = (data: any) => {
    const newNote = prompt("What's your sign?", data.note || "");
    if (newNote === null) {
      return;
    }
    fetch("/api/edit-note", {
      method: "POST",
      body: JSON.stringify({ data, note: newNote }),
    })
      .then((res) => res.json())
      .then(({ error }) => {
        if (error) {
          alert("edit note failed");
          return;
        }
        setData((oldData) => {
          return [...oldData].map((v) => {
            if (v.id !== data.id) {
              return v;
            }
            return {
              ...v,
              note: newNote,
            };
          });
        });
      });
  };
  useEffect(() => {
    fetch("/api/search", {
      method: "POST",
      body: JSON.stringify({ keyword }),
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
      });
  }, []);
  return (
    <div>
      {Array.isArray(data) && data.length ? (
        <div>
          <h3 className="mb-2">Total: {data.length}</h3>
          <PmTable
            rows={data}
            onDelete={handleDelete}
            onEditNote={handleEditNode}
            onOpenFolder={handleOpenFolder}
          />
        </div>
      ) : (
        <p>No results for "{keyword}"</p>
      )}
    </div>
  );
};
export default Search;
