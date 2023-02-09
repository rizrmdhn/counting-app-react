import React from "react";

function EditButton({ editKegiatan }) {
  return (
    <>
      <button
        className="edit-kegiatan-button btn btn-secondary"
        onClick={editKegiatan}
      >
        <i className="bi bi-pencil-square"></i>
        Edit Kegiatan{" "}
      </button>
    </>
  );
}

export default EditButton;
