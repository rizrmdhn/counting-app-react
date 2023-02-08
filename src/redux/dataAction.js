import axios from "axios";

export const getData = () => {
    return async (dispatch) => {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
        dispatch({
            type: "GET_DATA",
            payload: response.data
        });
    }
};