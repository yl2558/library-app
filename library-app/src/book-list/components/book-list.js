import React, { Component } from "react";
import { connect } from "react-redux";
import { getBookListJson } from "../actions";

class BookList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    // TODO: fetching book list data from server
    this.props.getBookListJson();
  }

  render() {
    return <div>{this.props.bookList}</div>;
  }
}

function mapStateToProps(state) {
  return {
    bookList: state.bookList.bookList
  };
}

export default connect(
  mapStateToProps,
  { getBookListJson }
)(BookList);
