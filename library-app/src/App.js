import React from "react";
import axios from "axios";
import { Route, Switch } from "react-router";
import Layout from "antd/lib/layout";
import Input from "antd/lib/input";
import Icon from "antd/lib/icon";
import Menu from "antd/lib/menu";
import Popconfirm from "antd/lib/popconfirm";
import { BookList, Book } from "./book-list";
import { ROOT_URL } from "./common";
import history from "./history";
import "./common/styles/global.scss";

const { Header, Content } = Layout;
const { SubMenu } = Menu;

axios.defaults.baseURL = ROOT_URL;

const error = err => {
  if (err.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    if (err.response.status === 416) {
      console.log(
        "No Data on selected page with current filter selection, please click submit first"
      );
    }
    const onClose =
      err.response.status === 401
        ? () => {
            // Using browserHistory to navigate outside of components
            axios.defaults.headers.common.Authorization = null;
            window.localStorage.removeItem("token");
            history.push("/");
          }
        : undefined;
    console.log(
      (err.response.data && err.response.data.message) ||
        "Something went wrong with the server, if it is frozen, please refresh"
    );
  } else if (err.request) {
    // The request was made but no response was received
    // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log("No response from the server was received");
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log(
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
    <Header style={{ background: "#fefefe", display: "flex" }}>
      <div style={{ width: "30%" }}>
        <Input
          placeholder="Search Book"
          prefix={<Icon type="search" style={{ color: "rgba(0,0,0,.25)" }} />}
        />
      </div>
      <div
        style={{
          width: "40%",
          display: "flex",
          itemAlign: "center",
          justifyContent: "center"
        }}
      >
        <span>Personal Library</span>
      </div>
      <div style={{ width: "30%" }}>
        <Menu
          theme="light"
          mode="horizontal"
          style={{ lineHeight: "64px", float: "right" }}
        >
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
    <Content style={{ padding: 24 }}>
      {
        <Switch>
          <Route path="/book" component={Book} />
          <Route path="/" component={BookList} />
        </Switch>
      }
    </Content>
  </Layout>
);

export default App;
