import axios from "axios";
import { REQUEST_BOOK_LIST } from "./constants/ActionTypes";

export function getBookListJson() {
  return function action(dispatch) {
    const request = axios.get("/profile");

    return request.then(response =>
      dispatch({
        type: REQUEST_BOOK_LIST,
        payload: response.data
      })
    );
  };
}
