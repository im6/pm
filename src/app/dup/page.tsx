"use client";
import { useState, useEffect } from "react";
import PmTable from "../../components/PmTable/index";

const DupHome = () => {
  const [data, setData] = useState();
  const [selected, setSelected] = useState();
  const handleDelete = (data: any) => {
    fetch("/api/delete-one", {
      method: "POST",
      body: JSON.stringify({ data }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Delete success.");
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
      .then((res) => {
        if (!res.error) {
          setData((oldData) => {
            if (!oldData) return;
            return oldData.map((v0) => {
              return v0.map((v1) => {
                if (v1.id !== data.id) {
                  return v1;
                } else {
                  return {
                    ...v1,
                    note: newNote,
                  };
                }
              });
            });
          });
        }
      });
  };
  const handleClickTable = (idx: number) => () => {
    setSelected(idx);
  };
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
    <div>
      <h3>Total: {Array.isArray(data) ? data.length : ""}</h3>
      {Array.isArray(data) &&
        data.map((v, k) => (
          <div
            className={`my-3 ${
              selected === k ? "border border-blue-700 border-2" : ""
            }`}
          >
            <PmTable
              key={k}
              rows={v}
              onDelete={handleDelete}
              onEditNote={handleEditNode}
              onOpenFolder={handleOpenFolder}
              onClickTable={handleClickTable(k)}
            />
          </div>
        ))}
    </div>
  );
};
export default DupHome;
