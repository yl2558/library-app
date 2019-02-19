import React from "react";
import { Route, Switch } from "react-router";
import axios from "axios";
import Layout from "antd/lib/layout";
import Menu from "antd/lib/menu";
import Input from "antd/lib/input";
import Icon from "antd/lib/icon";
import message from "antd/lib/message";

import { ROOT_URL, ErrorBoundary } from "./common";
import { BookList, Book } from "./book-list";
import "./common/styles/global.scss";

const { Header, Content } = Layout;
const { SubMenu } = Menu;

axios.defaults.baseURL = ROOT_URL;

const error = err => {
  if (err.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    message.error(
      (err.response.data && err.response.data.message) ||
        "Something went wrong with the server, if it is frozen, please refresh"
    );
  } else if (err.request) {
    // The request was made but no response was received
    // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    message.error("No response from the server was received");
  } else {
    // Something happened in setting up the request that triggered an Error
    message.error(
      err.message || "Something went wrong, if it is frozen, please refresh"
    );
  }
};

// Add a response interceptor
axios.interceptors.response.use(
  response =>
    // Do something with response data
    response,
  err => {
    error(err);
    return Promise.reject(error);
  }
);

const App = () => (
  <Layout>
    <Header className="header">
      <div className="w-30">
        <Input placeholder="Search Book" prefix={<Icon type="search" />} />
      </div>
      <div className="center w-40">
        <span>Personal Library</span>
      </div>
      <div className="w-30">
        <Menu theme="light" mode="horizontal" className="pull-right menu">
          <SubMenu
            key="username"
            title={
              <span>
                <Icon type="user" />
                Lydia@gmail.com
              </span>
            }
          >
            <Menu.Item key="logout">
              <div>
                <Icon type="logout" />
                Sign Out
              </div>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </Header>
    <ErrorBoundary>
      <Content className="content">
        {
          <Switch>
            <Route path="/book" component={Book} />
            <Route path="/" component={BookList} />
          </Switch>
        }
      </Content>
    </ErrorBoundary>
  </Layout>
);

export default App;
