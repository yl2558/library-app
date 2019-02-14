import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";

class Book extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { book } = this.props;
    if (_.isEmpty(book)) {
      return <div>Loading...</div>;
    }
    return <div>{book.title}</div>;
  }
}

function mapStateToProps(state) {
  return {
    book: state.bookList.book
  };
}

export default connect(
  mapStateToProps,
  {}
)(Book);
