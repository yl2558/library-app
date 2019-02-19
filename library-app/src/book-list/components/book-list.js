import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import Button from "antd/lib/button";
import Card from "antd/lib/card";
import Modal from "antd/lib/modal";
import Popconfirm from "antd/lib/popconfirm";
import Select from "antd/lib/select";
import Table from "antd/lib/table";
import Icon from "antd/lib/icon";
import { NoData, ErrorBoundary } from "../../common";
import {
  getBookList,
  getBook,
  addBook,
  deleteBook,
  updateBook,
  updateBookAvailability,
  setShowMode
} from "../actions";
import { BookForm } from "./book-form";
import "./book-list.scss";

class BookList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newBookVisible: false,
      updateBookVisible: false,
      filter: "all",
      book: {}
    };
  }

  componentDidMount() {
    this.props.getBookList();
  }

  // List single book
  handleOnClick = id => {
    this.props.getBook(id);
    this.props.history.push("/book");
  };

  // Add New Book
  handleAddBook = value => {
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
      newBookVisible: false
    });
  };

  showModal = () => {
    this.setState({
      newBookVisible: true
    });
  };

  handleOk = () => {
    this.setState({
      newBookVisible: false
    });
  };

  handleCancel = () => {
    this.setState({
      newBookVisible: false
    });
  };

  // Update Book Info
  handleUpdateBook = value => {
    console.log("update book", value);
    const book = {
      ...this.state.book,
      author: value.author,
      title: value.title,
      description: value.description
    };
    this.props.updateBook(book);
    this.setState({
      updateBookVisible: false,
      book: {}
    });
  };

  showUpdateModal = e => {
    this.setState({
      updateBookVisible: true,
      book: e
    });
  };

  handleUpdateOk = () => {
    this.setState({
      updateBookVisible: false,
      book: {}
    });
  };

  handleUpdateCancel = () => {
    this.setState({
      updateBookVisible: false,
      book: {}
    });
  };

  // Delete Book
  confirmDeleteBook = id => {
    this.props.deleteBook(id);
  };

  // Borrow/Return Book
  confirmUpdateAvailability = (id, availability) => {
    this.props.updateBookAvailability(id, availability);
  };

  handleFilterOnChange = filter => {
    this.setState({
      filter
    });
  };

  createBookCardComponent = (e, idx) => (
    <div key={idx} className="card-wrapper">
      <Card>
        <div className="card-content">
          <div className="left" onClick={() => this.handleOnClick(e.id)}>
            <img src={e.imageLink} alt={e.id} height="100%" width="100%" />
          </div>
          <div className="right">
            <h3>{e.title}</h3>
            <div className="mb-10">by {e.author}</div>
            <div>{e.description}</div>
          </div>
        </div>
        <div>
          <Popconfirm
            title="Are you sure you want to delete this book?"
            onConfirm={() => this.confirmDeleteBook(e.id)}
            okText="Yes"
            cancelText="No"
            icon={<Icon type="exclamation-circle" style={{ color: "red" }} />}
          >
            <Button className="mr-10" type="danger">
              Delete
            </Button>
          </Popconfirm>
          <Button className="mr-10" onClick={() => this.showUpdateModal(e)}>
            Update
          </Button>
          <Popconfirm
            title={`Are you sure you want to ${
              e.availability ? "borrow" : "return"
            } this book?`}
            onConfirm={() =>
              this.confirmUpdateAvailability(e.id, e.availability)
            }
            okText="Yes"
            cancelText="No"
          >
            <Button
              className="mr-10"
              type={e.availability ? "primary" : "default"}
            >
              {e.availability ? "Borrow" : "Return"}
            </Button>
          </Popconfirm>
        </div>
      </Card>
    </div>
  );

  constructColumns = () => {
    let columns = [
      {
        title: "Book Title",
        dataIndex: "title",
        key: "title",
        width: "25%",
        render: (text, record) => (
          <div style={{ display: "flex" }}>
            <div
              style={{
                width: 50,
                height: 50,
                minWidth: 50,
                marginRight: 14,
                backgroundColor: "#fff",
                cursor: "pointer"
              }}
              className="center"
              onClick={() => this.handleOnClick(record.id)}
            >
              <img
                src={record.imageLink}
                style={{
                  maxWidth: 50,
                  maxHeight: 50
                }}
                alt="book"
              />
            </div>
            <div className="center">
              <span>{record.title}</span>
            </div>
          </div>
        )
      },
      {
        title: "Author",
        dataIndex: "author",
        key: "author",
        width: "20%"
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        width: "30%",
        onCell: () => {
          return {
            style: {
              whiteSpace: "nowrap",
              maxWidth: 150
            }
          };
        },
        render: (text, record) => (
          <div style={{ textOverflow: "ellipsis", overflow: "hidden" }}>
            {record.description}
          </div>
        )
      },
      {
        title: "Actions",
        key: "actions",
        width: "25%",
        render: (text, record, index) => (
          <div>
            <Popconfirm
              title="Are you sure you want to delete this book?"
              onConfirm={() => this.confirmDeleteBook(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button className="mr-10" type="danger">
                Delete
              </Button>
            </Popconfirm>
            <Button
              className="mr-10"
              onClick={() => this.showUpdateModal(record)}
            >
              Update
            </Button>
            <Popconfirm
              title={`Are you sure you want to ${
                record.availability ? "borrow" : "return"
              } this book?`}
              onConfirm={() =>
                this.confirmUpdateAvailability(record.id, record.availability)
              }
              okText="Yes"
              cancelText="No"
            >
              <Button
                className="mr-10"
                type={record.availability ? "primary" : "default"}
              >
                {record.availability ? "Borrow" : "Return"}
              </Button>
            </Popconfirm>
          </div>
        )
      }
    ];
    return columns;
  };

  constructDataSource = bookList => {
    const data = [];
    for (let book of bookList) {
      data.push({
        id: book.id,
        title: book.title,
        author: book.author,
        description: book.description,
        imageLink: book.imageLink,
        availability: book.availability
      });
    }
    return data;
  };

  setStoreMode = () => {
    this.props.setShowMode("store");
  };

  setTableMode = () => {
    this.props.setShowMode("table");
  };

  render() {
    const Option = Select.Option;
    const { bookList, show } = this.props;
    const { filter } = this.state;
    if (_.isEmpty(bookList)) {
      return <div>Loading...</div>;
    }
    const filteredBookList =
      filter === "all"
        ? bookList
        : filter === "loaned"
        ? _.filter(bookList, ["availability", false])
        : _.filter(bookList, ["availability", true]);
    return (
      <ErrorBoundary>
        <div className="book-list">
          <div style={{ padding: "0 10px" }}>
            <Button className="mb-10 mr-10" onClick={this.showModal}>
              Add new book
            </Button>
            <Select
              defaultValue={this.state.filter}
              style={{ width: "20%" }}
              onChange={e => this.handleFilterOnChange(e)}
            >
              <Option value="all">Show All Books</Option>
              <Option value="loaned">Show Loaned Books</Option>
              <Option value="available">Show Available Books</Option>
            </Select>
            <Button
              style={{ float: "right" }}
              className="mb-10"
              onClick={this.setStoreMode}
              type={show === "store" ? "primary" : "default"}
            >
              <Icon type="appstore" />
            </Button>
            <Button
              style={{ float: "right" }}
              className="mb-10 mr-10"
              onClick={this.setTableMode}
              type={show === "table" ? "primary" : "default"}
            >
              <Icon type="bars" />
            </Button>
            <Modal
              title="Add New Book"
              visible={this.state.newBookVisible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={null}
            >
              <BookForm
                onSubmit={value => this.handleAddBook(value)}
                bookInfo={this.state.book}
                label="Add"
              />
            </Modal>
            <Modal
              title="Update Book Info"
              visible={this.state.updateBookVisible}
              onOk={this.handleUpdateOk}
              onCancel={this.handleUpdateCancel}
              footer={null}
            >
              <BookForm
                onSubmit={value => this.handleUpdateBook(value)}
                bookInfo={this.state.book}
                label="Update"
              />
            </Modal>
          </div>
          {_.isEmpty(filteredBookList) ? (
            <NoData />
          ) : show === "store" ? (
            <div className="book-store">
              {filteredBookList.map((e, idx) =>
                this.createBookCardComponent(e, idx)
              )}
            </div>
          ) : (
            <div style={{ padding: "0 10px" }}>
              <Table
                className="book-table"
                columns={this.constructColumns()}
                dataSource={this.constructDataSource(filteredBookList)}
                pagination={false}
              />
            </div>
          )}
        </div>
      </ErrorBoundary>
    );
  }
}

function mapStateToProps(state) {
  return {
    bookList: state.bookList.bookList,
    show: state.bookList.show
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
    updateBookAvailability,
    setShowMode
  }
)(BookList);
