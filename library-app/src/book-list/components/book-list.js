import React, { Component } from "react";
import { connect } from "react-redux";

class BookList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    // TODO: fetching book list data from server
  }

  render() {
    return <div>Book List</div>;
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
  {}
)(BookList);
