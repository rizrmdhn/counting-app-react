import React, { Suspense, lazy } from "react";
import "./styles/styles.css";
import { Route, Routes } from "react-router-dom";
import Loader from "../../components/Loader";

const Home = lazy(() => import("../../components/Home"));
const Data = lazy(() => import("../../components/Data"));
const TableContainer = lazy(() =>
  import("../../components/Table/TableContainer")
);
const Modal = lazy(() => import("../../components/modal"));
const ErrorPage = lazy(() => import("../../components/Error/ErrorPage"));
const InputAcara = lazy(() => import("../../components/InputAcara"));
const InputKegiatan = lazy(() => import("../../components/InputKegiatan"));
const EditKegiatanFisik = lazy(() => import("../..//components/EditKegiatan"));

function MainPage({ lists, viewData }) {
  return (
    <div className="main-container">
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route path="/" element={<Home />} />
          <Route
            path="acara"
            element={<Data lists={lists} viewData={viewData} />}
          />
          <Route
            path="acara/:id/kegiatan"
            element={<TableContainer viewData={viewData} />}
          />
          <Route path="/data/add" element={<InputAcara />} />
          <Route path="/data/add-kegiatan" element={<InputKegiatan />} />
          <Route path="/data/edit/:id" element={<EditKegiatanFisik />} />
        </Routes>
        <Modal />
      </Suspense>
    </div>
  );
}

export default MainPage;
