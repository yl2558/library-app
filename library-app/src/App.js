import React from "react";
import { Route, Switch } from "react-router";
import { BookList } from "./book-list";

const App = () => (
  <Switch>
    <Route exact path="/" component={BookList} />
  </Switch>
);

export default App;
