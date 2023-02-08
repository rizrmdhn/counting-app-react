import React from "react";

function NoDataTablePage({ addKegiatan }) {
  return (
    <div className="add-kegiatan-button">
      <button className="btn btn-primary" onClick={addKegiatan}>
        {" "}
        Tambah Kegiatan{" "}
      </button>
    </div>
  );
}

export default NoDataTablePage;
