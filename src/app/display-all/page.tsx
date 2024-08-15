"use client";
import { useState, useEffect } from "react";
import PmTable from "../../components/PmTable/index";

const DisplayAllHome = () => {
  const [data, setData] = useState();
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
    fetch("/api/show-all", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
      });
  }, []);
  return (
    <div>
      <h3>Total: {Array.isArray(data) ? data.length : ""}</h3>
      {
        <PmTable
          rows={data}
          onDelete={handleDelete}
          onEditNote={handleEditNode}
          onOpenFolder={handleOpenFolder}
        />
      }
    </div>
  );
};
export default DisplayAllHome;
