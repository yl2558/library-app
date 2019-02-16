import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import Button from "antd/lib/button";
import Card from "antd/lib/card";
import Modal from "antd/lib/modal";
import Popconfirm from "antd/lib/popconfirm";
import Select from "antd/lib/select";
import {
  getBookList,
  getBook,
  addBook,
  deleteBook,
  updateBook,
  updateBookAvailability
} from "../actions";
import { NewBookForm } from "./new-book-form";
import "./book-list.scss";

class BookList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      updateVisible: false,
      show: "all",
      book: {}
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleAddNewBook = this.handleAddNewBook.bind(this);
    this.handleDeleteBook = this.handleDeleteBook.bind(this);
    this.handleUpdateBook = this.handleUpdateBook.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentDidMount() {
    // TODO: fetching book list data from server
    this.props.getBookList();
  }

  handleOnClick(id) {
    this.props.getBook(id);
    this.props.history.push("/book");
  }

  handleAddNewBook(value) {
    console.log("add a new book", value);
    const book = {
      author: value.author,
      imageLink: "images/fairy-tales.jpg",
      title: value.title,
      description: value.description,
      availability: true
    };
    this.props.addBook(book);
    this.setState({
      visible: false
    });
  }

  handleUpdateBook(value) {
    console.log("update book", value);
    const book = {
      ...this.state.book,
      author: value.author,
      title: value.title,
      description: value.description
    };
    this.props.updateBook(book);
    this.setState({
      updateVisible: false,
      book: {}
    });
  }

  handleDeleteBook(id) {
    this.props.deleteBook(id);
  }

  handleOnChange(e) {
    console.log(e);
    this.setState({
      show: e
    });
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  showUpdateModal = e => {
    this.setState({
      updateVisible: true,
      book: e
    });
  };

  handleUpdateOk = e => {
    console.log(e);
    this.setState({
      updateVisible: false,
      book: {}
    });
  };

  handleUpdateCancel = e => {
    console.log(e);
    this.setState({
      updateVisible: false,
      book: {}
    });
  };

  cancel = e => {
    console.log(e);
  };

  confirm = id => {
    this.props.deleteBook(id);
  };

  updateAvailabilityConfirm = (id, availability) => {
    this.props.updateBookAvailability(id, availability);
  };

  createBookCardComponent = (e, idx) => (
    <div style={{ width: "100%", padding: "0 10px" }}>
      <Card key={idx} className="card">
        <div style={{ display: "flex", marginBottom: 10 }}>
          <div className="left" onClick={() => this.handleOnClick(e.id)}>
            <img src={e.imageLink} alt={e.id} height="100%" width="100%" />
          </div>
          <div className="right">
            <h3>{e.title}</h3>
            <div style={{ marginBottom: 10, marginTop: -5 }}>by {e.author}</div>
            <div>{e.description}</div>
          </div>
        </div>
        <div>
          <Popconfirm
            title="Are you sure you want to delete this book?"
            onConfirm={() => this.confirm(e.id)}
            onCancel={this.cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button style={{ marginRight: "3%" }} type="danger">
              Delete
            </Button>
          </Popconfirm>
          <Button
            style={{ marginRight: "3%" }}
            onClick={() => this.showUpdateModal(e)}
          >
            Update
          </Button>
          <Popconfirm
            title={`Are you sure you want to ${
              e.availability ? "borrow" : "return"
            } this book?`}
            onConfirm={() =>
              this.updateAvailabilityConfirm(e.id, e.availability)
            }
            onCancel={this.cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button
              style={{ marginRight: "3%" }}
              type={e.availability ? "primary" : "default"}
            >
              {e.availability ? "Borrow" : "Return"}
            </Button>
          </Popconfirm>
        </div>
      </Card>
    </div>
  );

  render() {
    const Option = Select.Option;
    const { bookList } = this.props;
    if (_.isEmpty(bookList)) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <div style={{ padding: "0 10px" }}>
          <Button
            style={{ marginBottom: 10, marginRight: 10 }}
            onClick={this.showModal}
          >
            Add new book
          </Button>
          <Select
            defaultValue={this.state.show}
            style={{ width: "20%" }}
            onChange={e => this.handleOnChange(e)}
          >
            <Option value="all">Show All Books</Option>
            <Option value="loaned">Show Loaned Books</Option>
            <Option value="available">Show Available Books</Option>
          </Select>
          <Modal
            title="Add New Book"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={null}
          >
            <NewBookForm
              onSubmit={value => this.handleAddNewBook(value)}
              bookInfo={this.state.book}
            />
          </Modal>
          <Modal
            title="Update Book Info"
            visible={this.state.updateVisible}
            onOk={this.handleUpdateOk}
            onCancel={this.handleUpdateCancel}
            footer={null}
          >
            <NewBookForm
              onSubmit={value => this.handleUpdateBook(value)}
              bookInfo={this.state.book}
            />
          </Modal>
        </div>
        <div className="book-list">
          {this.state.show === "all" &&
            this.props.bookList.map((e, idx) =>
              this.createBookCardComponent(e, idx)
            )}
          {this.state.show === "loaned" &&
            _.filter(this.props.bookList, ["availability", false]).map(
              (e, idx) => this.createBookCardComponent(e, idx)
            )}
          {this.state.show === "available" &&
            _.filter(this.props.bookList, ["availability", true]).map(
              (e, idx) => this.createBookCardComponent(e, idx)
            )}
        </div>
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
  {
    getBookList,
    getBook,
    addBook,
    deleteBook,
    updateBook,
    updateBookAvailability
  }
)(BookList);
