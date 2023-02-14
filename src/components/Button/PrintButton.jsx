import React from "react";

function PrintButton({ printKegiatan }) {
  return (
    <>
      <button
        className="edit-kegiatan-button btn btn-secondary"
        onClick={printKegiatan}
      >
        <i className="bi bi-filetype-pdf"></i>
        Print Table{" "}
      </button>
    </>
  );
}

export default PrintButton;
