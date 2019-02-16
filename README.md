# library-app

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

please download and install:
[Node.js](https://nodejs.org/en/download/),
`npm` will be downloaded and installed along with `Node.js`

Since we are going to use `Yarn` instead of `npm`, let's install `Yarn` at first:

```sh
npm install -g yarn
```

### Start JSON server:
Using [json-server](https://github.com/typicode/json-server) as the backend for this application. Within current directory, you will see a file called `db.json`. Start the server on port 3004.

```sh
json-server --watch db.json --port 3004
```


### Package Installing

```sh
cd into project directory (named `library-app`)
yarn install
```

### Running Project in Dev Environment

```sh
yarn start
```

### Building Project

It will compress `javascript` and 'css' files and then all assets will be placed in the _**build**_ directory

```
yarn build
```

### Technology Choices

* #### Base Library
  * [React](https://facebook.github.io/react/) - A Javascript library for building user interface
  * [Redux](redux.js.org/) - A predictable state container for JavaScript apps
     * [Redux-Thunk](https://github.com/reduxjs/redux-thunk) - Redux middleware allows you to write action creators that return a function instead of an action.
     * [Redux DevTools](https://github.com/gaearon/redux-devtools) - DevTools for Redux with hot reloading, action replay, and customizable UI
  * [React Router](https://github.com/ReactTraining/react-router) - Declarative routing for React
     * [React-Router-Scroll](https://github.com/taion/react-router-scroll) - React Router scroll management

* #### Boilerplate
  * [Yarn](https://yarnpkg.com/en/) - Fast, reliable, and secure dependency management.
  * [Create-React-App](https://github.com/facebookincubator/create-react-app) - Create React apps with no build configuration
  * [Webpack](https://webpack.github.io/) - A module bundler

* #### Grammar
  * [ECMAScript 6](https://github.com/lukehoban/es6features) - ECMAScript 6, also known as ECMAScript 2015, is latest version of the ECMAScript standard
  * [Babel](https://babeljs.io/) - A compiler for writing next generation JavaScript

* #### Util
  * [Lodash](https://lodash.com/) - A modern JavaScript utility library delivering modularity, performance & extras.
  * [Axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js
  * [React Loadable](https://github.com/jamiebuilds/react-loadable) - A higher order component for loading components with dynamic imports

* #### UI Framework
  * [Ant Design](https://ant.design/) - An enterprise-class UI design language and React-based implementation
