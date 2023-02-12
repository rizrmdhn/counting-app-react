import React from "react";
import EmptyDataPage from "../../Error/EmptyDataPage";
import TableHeader from "./TableHeader";

function Table({ item, onAddKegiatanFisik, editMode }) {
  return (
    <>
      {item.kegiatan.length !== 0 ? (
        <>
          {item.kegiatan.map((kegiatan, index) => {
            return (
              <TableHeader
                kegiatan={kegiatan}
                index={index}
                editMode={editMode}
                itemId={item.id}
                key={kegiatan.id}
                onAddKegiatanFisik={onAddKegiatanFisik}
              />
            );
          })}
        </>
      ) : (
        <EmptyDataPage />
      )}
    </>
  );
}

export default Table;
