import _ from "lodash";
import {
  REQUEST_BOOK_LIST,
  REQUEST_BOOK,
  ADD_BOOK,
  DELETE_BOOK,
  UPDATE_BOOK,
  UPDATE_BOOK_AVAILABILITY
} from "./constants/ActionTypes";

const INITIAL_STATE = {
  bookList: [],
  book: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_BOOK_LIST:
      return { ...state, bookList: action.payload };
    case REQUEST_BOOK:
      return { ...state, book: action.payload };
    case ADD_BOOK:
      return { ...state, bookList: [...state.bookList, action.payload] };
    case DELETE_BOOK:
      const deleteId = action.payload;
      const deleteIdx = _.findIndex(state.bookList, ["id", deleteId]);
      return {
        ...state,
        bookList: [
          ...state.bookList.slice(0, deleteIdx),
          ...state.bookList.slice(deleteIdx + 1)
        ]
      };
    case UPDATE_BOOK:
      const updateBook = action.payload;
      const updateIdx = _.findIndex(state.bookList, ["id", updateBook.id]);
      return {
        ...state,
        bookList: [
          ...state.bookList.slice(0, updateIdx),
          updateBook,
          ...state.bookList.slice(updateIdx + 1)
        ]
      };
    case UPDATE_BOOK_AVAILABILITY:
      const { id, book } = action.payload;
      const idx = _.findIndex(state.bookList, ["id", id]);
      return {
        ...state,
        bookList: [
          ...state.bookList.slice(0, idx),
          book,
          ...state.bookList.slice(idx + 1)
        ]
      };
    default:
      return state;
  }
};
