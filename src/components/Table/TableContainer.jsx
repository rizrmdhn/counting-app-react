import React, { useEffect, useRef, useState } from "react";
import Table from "./views/Table";
import "./styles/styles.css";
import { useLocation, useNavigate } from "react-router-dom";
import AddButton from "../Button/AddButton";
import EditButton from "../Button/EditButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchViewData, isLoadingState } from "../../redux/dataSlice";
import Loader from "../Loader";
import currencyFormat from "../../utils/currencyFormat";
import PrintButton from "../Button/PrintButton";
import { useReactToPrint } from "react-to-print";

function TableContainer({ viewData }) {
  const isLoading = useSelector(isLoadingState);

  const componentRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (viewData.length === 0) {
      const id = location.pathname.split("/")[2];
      dispatch(fetchViewData(id));
    } else {
      return;
    }
  }, []);

  const handleAddKegiatan = () => {
    const acaraId = viewData[0].id;
    window.localStorage.setItem("acaraId", acaraId);
    navigate("/data/add-kegiatan");
  };

  const handleEditKegiatan = () => {
    setEditMode(!editMode);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      {isLoading === true ? (
        <Loader />
      ) : (
        <div className="table-container">
          <div className="table-title">
            <h1>{viewData.name}</h1>
          </div>
          <div className="action-button">
            <AddButton addKegiatan={() => handleAddKegiatan()} />
            <EditButton editKegiatan={() => handleEditKegiatan()} />
            <PrintButton printKegiatan={() => handlePrint()} />
          </div>
          <div className="tg-wrap">
            {viewData.map((item) => (
              <table
                ref={componentRef}
                className="tg animate__animated animate__fadeIn"
                key={item.id}
              >
                <Table key={item.id} item={item} editMode={editMode} />
                <tfoot>
                  <tr>
                    <td className="tg-0pky bg-green" colSpan="4">
                      <span className="tg-total">
                        <em>TOTAL DANA KESELURUHAN</em>
                      </span>
                    </td>
                    <td className="tg-0pky bg-green">
                      <span className="tg-total">
                        {currencyFormat(item.totalPrice)}
                      </span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default TableContainer;
