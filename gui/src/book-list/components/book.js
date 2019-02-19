import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import Button from "antd/lib/button";
import Card from "antd/lib/card";

import { ErrorBoundary } from "../../common";
import "./book-list.scss";

class Book extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleOnClick = () => {
    this.props.history.push("/");
  };

  render() {
    const { book } = this.props;
    if (_.isEmpty(book)) {
      return <div>Loading...</div>;
    }
    return (
      <ErrorBoundary>
        <div style={{ display: "flex" }} className="center mb-10">
          <div style={{ width: "50%" }}>
            <Button onClick={this.handleOnClick}>Back</Button>
          </div>
        </div>
        <div style={{ display: "flex" }} className="center">
          <Card style={{ width: "50%" }}>
            <div style={{ display: "flex" }}>
              <div style={{ flex: "30% 1 1" }}>
                <img
                  src={book.imageLink}
                  alt={book.id}
                  height="100%"
                  width="100%"
                />
              </div>
              <div className="mb-10 ml-10" style={{ flex: "70% 1 1" }}>
                <h3>{book.title}</h3>
                <div className="mb-10">by {book.author}</div>
                <div>{book.description}</div>
              </div>
            </div>
          </Card>
        </div>
      </ErrorBoundary>
    );
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
