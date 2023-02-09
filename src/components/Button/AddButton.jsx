import React from "react";

function AddButton({ addKegiatan }) {
  return (
    <>
      <button
        className="add-kegiatan-button btn btn-primary"
        onClick={addKegiatan}
      >
        {" "}
        Tambah Kegiatan{" "}
      </button>
    </>
  );
}

export default AddButton;
