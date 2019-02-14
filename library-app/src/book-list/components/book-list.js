import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { getBookListJson, getBook, addNewBook, deleteBook } from "../actions";

class BookList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleAddNewBook = this.handleAddNewBook.bind(this);
    this.handleDeleteBook = this.handleDeleteBook.bind(this);
  }

  componentDidMount() {
    // TODO: fetching book list data from server
    this.props.getBookListJson();
  }

  handleOnClick(id) {
    this.props.getBook(id);
    this.props.history.push("/book");
  }

  handleAddNewBook() {
    console.log("add a new book");
    const book = {
      author: "Hans Christian Andersen",
      imageLink: "images/fairy-tales.jpg",
      link:
        "https://en.wikipedia.org/wiki/Fairy_Tales_Told_for_Children._First_Collection.\n",
      title: "Fairy tales II"
    };
    this.props.addNewBook(book);
  }

  handleDeleteBook(id, idx) {
    this.props.deleteBook(id, idx);
  }

  render() {
    const { bookList } = this.props;
    if (_.isEmpty(bookList)) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        {this.props.bookList.map((e, idx) => (
          <div key={idx}>
            <span onClick={() => this.handleOnClick(e.id)}>{e.title}</span>
            <button onClick={() => this.handleDeleteBook(e.id, idx)}>
              Delete
            </button>
          </div>
        ))}
        <button onClick={this.handleAddNewBook}>Add new book</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    bookList: state.bookList.bookList
  };
}

export default connect(
  mapStateToProps,
  { getBookListJson, getBook, addNewBook, deleteBook }
)(BookList);
