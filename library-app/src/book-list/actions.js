import axios from "axios";
import {
  REQUEST_BOOK_LIST,
  REQUEST_BOOK,
  ADD_NEW_BOOK,
  DELETE_BOOK
} from "./constants/ActionTypes";

export function getBookListJson() {
  return function action(dispatch) {
    const request = axios.get("/books");

    return request.then(response =>
      dispatch({
        type: REQUEST_BOOK_LIST,
        payload: response.data
      })
    );
  };
}

export function getBook(id) {
  return function action(dispatch) {
    const request = axios.get(`/books/${id}`);

    return request.then(response =>
      dispatch({
        type: REQUEST_BOOK,
        payload: response.data
      })
    );
  };
}

export function addNewBook(book) {
  return function action(dispatch) {
    const request = axios.post("/books", book);
    return request.then(res => {
      dispatch({
        type: ADD_NEW_BOOK,
        payload: res.data
      });
    });
  };
}

export function deleteBook(id, idx) {
  return function action(dispatch) {
    const request = axios.delete(`/books/${id}`);
    return request.then(() =>
      dispatch({
        type: DELETE_BOOK,
        payload: idx
      })
    );
  };
}
