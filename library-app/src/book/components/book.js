import React, { Component } from "react";
import { connect } from "react-redux";

class Book extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    // TODO: fetching book list data from server
  }

  render() {
    return <div>Book</div>;
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
  {}
)(Book);
