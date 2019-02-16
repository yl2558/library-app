import axios from "axios";
import {
  REQUEST_BOOK_LIST,
  REQUEST_BOOK,
  ADD_BOOK,
  DELETE_BOOK,
  UPDATE_BOOK,
  UPDATE_BOOK_AVAILABILITY
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

export function addBook(book) {
  return function action(dispatch) {
    const request = axios.post("/books", book);
    return request.then(res => {
      dispatch({
        type: ADD_BOOK,
        payload: res.data
      });
    });
  };
}

export function deleteBook(id) {
  return function action(dispatch) {
    const request = axios.delete(`/books/${id}`);
    return request.then(() =>
      dispatch({
        type: DELETE_BOOK,
        payload: id
      })
    );
  };
}

export function updateBook(book) {
  return function action(dispatch) {
    const request = axios.put(`/books/${book.id}`, book);
    return request.then(res =>
      dispatch({
        type: UPDATE_BOOK,
        payload: { ...book, ...res }
      })
    );
  };
}

export function updateBookAvailability(id, availability) {
  return function action(dispatch) {
    const request = axios.patch(`/books/${id}`, {
      availability: !availability
    });
    return request.then(res => {
      dispatch({
        type: UPDATE_BOOK_AVAILABILITY,
        payload: {
          id,
          book: res.data
        }
      });
    });
  };
}
