import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import Button from "antd/lib/button";
import Card from "antd/lib/card";

import { ErrorBoundary } from "../../common";
import "./book.scss";

/**
 * List a single book
 * @extends Component
 */
class Book extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  /**
   * Click to Nav back to the main page
   * @return {[type]} [description]
   */
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
        <div className="center mb-10">
          <div className="w-50">
            <Button onClick={this.handleOnClick}>Back</Button>
          </div>
        </div>
        <div className="center">
          <Card className="w-50">
            <div className="book">
              <div className="left">
                <img
                  src={book.imageLink}
                  alt={book.id}
                  height="100%"
                  width="100%"
                />
              </div>
              <div className="mb-10 right">
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
