import { REQUEST_BOOK_LIST } from "./constants/ActionTypes";

const INITIAL_STATE = {
  bookList: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_BOOK_LIST:
      console.log("test", action.payload);
      return { ...state, bookList: action.payload.name };
    default:
      return state;
  }
};
