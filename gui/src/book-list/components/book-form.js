import React, { Component } from "react";
import _ from "lodash";
import Form from "antd/lib/form";
import Button from "antd/lib/button";
import Input from "antd/lib/input";

class BookForm extends Component {
  constructor(props) {
    super(props);

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (_.isEmpty(err)) {
        this.props.onSubmit(values);
        this.props.form.resetFields();
      }
    });
  }

  render() {
    const FormItem = Form.Item;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const { bookInfo, label } = this.props;
    return (
      <Form onSubmit={this.handleOnSubmit}>
        <FormItem {...formItemLayout} label="Title">
          {getFieldDecorator("title", {
            rules: [
              {
                required: true,
                message: "Please input Book Title!"
              }
            ],
            initialValue: bookInfo.title
          })(<Input placeholder="Enter Book Title" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Author">
          {getFieldDecorator("author", {
            rules: [
              {
                required: true,
                message: "Please input Book Author!"
              }
            ],
            initialValue: bookInfo.author
          })(<Input placeholder="Enter Book Author" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Description">
          {getFieldDecorator("description", {
            rules: [
              {
                required: true,
                message: "Please input Book Description!"
              }
            ],
            initialValue: bookInfo.description
          })(<Input.TextArea rows={5} placeholder="Enter Book Description" />)}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" style={{ float: "right" }}>
            {label}
          </Button>
        </FormItem>
      </Form>
    );
  }
}

BookForm = Form.create()(BookForm);
export { BookForm };
export default BookForm;
