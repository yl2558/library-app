import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import Button from "antd/lib/button";
import Card from "antd/lib/card";
import Icon from "antd/lib/icon";
import Modal from "antd/lib/modal";
import Popconfirm from "antd/lib/popconfirm";
import Select from "antd/lib/select";
import Table from "antd/lib/table";

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

/**
 * List all books, Add a new book, Delete/Update existing book
 * Borrow/Return an existing book
 * @extends Component
 */
class BookList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      /**
       * newBookVisible controls the visibility of the create a new book Modal
       * @type {Boolean}
       */
      newBookVisible: false,
      /**
       * updateBookVisible controls the visibility of the update book Modal
       * @type {Boolean}
       */
      updateBookVisible: false,
      /**
       * filter has three status: all/loaned/available, which controls
       * show all the books, show the books you borrowed, show the books still available
       * @type {String}
       */
      filter: "all",
      /**
       * book saves the bookInfo you choose to update and will be passed into the
       * update form as initial value
       * @type {Object}
       */
      book: {}
    };
  }

  componentDidMount() {
    this.props.getBookList();
  }

  /**
   * Click on a single book to list a single book Info
   * nav to book info page
   * @param  {number} id required, id of the book you select
   * @return {[type]}       [description]
   */
  handleOnClick = id => {
    this.props.getBook(id);
    this.props.history.push("/book");
  };

  /**
   * Add a new book
   * @param  {Object} value book value object from BookForm component
   * @return {[type]}       [description]
   */
  handleAddBook = value => {
    console.log("add a new book", value);
    const book = {
      author: value.author,
      imageLink: "https://via.placeholder.com/100x150/a6cae5/fefefe?text=book",
      title: value.title,
      description: value.description,
      availability: true
    };
    this.props.addBook(book);
    this.setState({
      newBookVisible: false
    });
  };

  /**
   * Show create a new book Modal
   * @return {[type]} [description]
   */
  showModal = () => {
    this.setState({
      newBookVisible: true
    });
  };

  /**
   * Close create a new book Modal
   * @return {[type]} [description]
   */
  handleCancel = () => {
    this.setState({
      newBookVisible: false
    });
  };

  /**
   * Update an existing book
   * @param  {Object} value book value object from BookForm component
   * @return {[type]}       [description]
   */
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

  /**
   * Show update an existing book Modal, set the select BookInfo passing to the
   * BookForm component as default value
   * @return {[type]} [description]
   */
  showUpdateModal = e => {
    this.setState({
      updateBookVisible: true,
      book: e
    });
  };

  /**
   * Close update an existing book Modal & clear the select BookInfo
   * @return {[type]} [description]
   */
  handleUpdateCancel = () => {
    this.setState({
      updateBookVisible: false,
      book: {}
    });
  };

  /**
   * Delete an existing book
   * @param  {Number} id required, id of the book you select
   * @return {[type]}    [description]
   */
  confirmDeleteBook = id => {
    this.props.deleteBook(id);
  };

  /**
   * Borrow/Return a book
   * @param  {Number} id            required, id of the book you select
   * @param  {Boolean} availability required, current availability of the book you select
   * @return {[type]}               [description]
   */
  confirmUpdateAvailability = (id, availability) => {
    this.props.updateBookAvailability(id, availability);
  };

  /**
   * Change the filter selection, choose to show all/loaned/available books
   * @param  {[type]} filter [description]
   * @return {[type]}        [description]
   */
  handleFilterOnChange = filter => {
    this.setState({
      filter
    });
  };

  /**
   * Create book card component to show each book
   * @param  {Object} e   required, book object
   * @param  {Number} idx required, book index
   * @return {Object}     return a JSX element
   */
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

  /**
   * Create columns for antd table
   * @return {Array} an array of object
   */
  constructColumns = () => {
    let columns = [
      {
        title: "Book Title",
        dataIndex: "title",
        key: "title",
        width: "25%",
        render: (text, record) => (
          <div className="title">
            <div
              className="center mr-10 s-img"
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
              maxWidth: 100
            }
          };
        },
        render: (text, record) => (
          <div className="ellipsis">{record.description}</div>
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

  /**
   * Create data source array for antd table
   * @return {Array} an array of object
   */
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

  /**
   * set the show mode in redux store to switch between store/table mode
   */
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
          <div className="pl-10 pr-10">
            <Button className="mb-10 mr-10" onClick={this.showModal}>
              Add new book
            </Button>
            <Select
              defaultValue={this.state.filter}
              className="w-20"
              onChange={e => this.handleFilterOnChange(e)}
            >
              <Option value="all">Show All Books</Option>
              <Option value="loaned">Show Loaned Books</Option>
              <Option value="available">Show Available Books</Option>
            </Select>
            <Button
              className="mb-10 pull-right"
              onClick={this.setStoreMode}
              type={show === "store" ? "primary" : "default"}
            >
              <Icon type="appstore" />
            </Button>
            <Button
              className="mb-10 mr-10 pull-right"
              onClick={this.setTableMode}
              type={show === "table" ? "primary" : "default"}
            >
              <Icon type="bars" />
            </Button>
            <Modal
              title="Add New Book"
              visible={this.state.newBookVisible}
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
            <div className="pl-10 pr-10">
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
