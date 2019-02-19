import { combineReducers } from "redux";
import { reducer as bookList } from "./book-list";

const rootReducer = combineReducers({
  bookList
});

export default rootReducer;
