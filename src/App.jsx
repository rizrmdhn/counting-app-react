import "./styles/styles.css";
import Menu from "./components/Menu";
import MainPage from "./pages/Main";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData, showData, showViewData } from "./redux/dataSlice";

function App() {
  const lists = useSelector(showData);
  const viewData = useSelector(showViewData);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      dispatch(fetchData());
    }
    getData();
  }, []);

  return (
    <div className="App">
      <Menu />
      <MainPage lists={lists} viewData={viewData} />
    </div>
  );
}

export default App;
