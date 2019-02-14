import {
  REQUEST_BOOK_LIST,
  REQUEST_BOOK,
  ADD_NEW_BOOK,
  DELETE_BOOK
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
    case ADD_NEW_BOOK:
      return { ...state, bookList: [...state.bookList, action.payload] };
    case DELETE_BOOK:
      const idx = action.payload;
      return {
        ...state,
        bookList: [
          ...state.bookList.slice(0, idx),
          ...state.bookList.slice(idx + 1)
        ]
      };
    default:
      return state;
  }
};
