import { configureStore } from "@reduxjs/toolkit";
import DataReducer from "./dataSlice";

export default configureStore({
    reducer: {
        data: DataReducer,
    },
});