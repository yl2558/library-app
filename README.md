# library-app

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

please download and install:
[Node.js](https://nodejs.org/en/download/)
(`npm` will be downloaded and installed along with `Node.js`), [JSON Server](https://github.com/typicode/json-server)

Since we are going to use `Yarn` instead of `npm`, let's install `Yarn` at first:

```sh
npm install -g yarn
npm install -g json-server
```

### Start JSON server:
Using [json-server](https://github.com/typicode/json-server) as the backend for this application. Within current directory, you will see a file called `db.json`. Start the server on port 3004.

```sh
json-server --watch db.json --port 3004
```


### Package Installing

```sh
cd into project directory (named `gui`)
yarn install
```

### Running Project in Dev Environment

```sh
yarn start
```

### Technology Choices

* #### Base Library
  * [React](https://facebook.github.io/react/) - A Javascript library for building user interface
  * [Redux](https://github.com/reduxjs/redux) - A predictable state container for JavaScript apps
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
  

### Code Maintainability & File Structure
* #### Organize by Feature
In a large project, organizing by feature affords you the ability to focus on the feature at hand, instead of having to worry about navigating the entire project. This means that if I need to change something related to book-list, I can work solely within that module and not even think about the rest of the application. In a sense, it creates an application within the main application.

```
src/
  App.js
  index.js
  rootReducer.js

  common/
    index.js
    components/
    constants/
    styles/

  book-list/
    components/
    constants/
      actionTypes.js
    index.js
    actions.js
    reducer.js
```

* #### Create Strict Module Boundaries
Divide the application by modules, and for each module, make sure to export resources via `index.js` if needed by which we create a window to expose the module to the outside world.
It increases the maintainability of our application especially when there are dependencies existing across different modules.

For example, when `component` in `Projects` module "import" a `component` in `Todos` module,

***Bad***

``` javascript
import actions from '../todos/actions';
import TodoItem from '../todos/components/TodoItem';
```

***Good***

```javascript
import todos from '../todos';
const { actions, TodoItem } = todos;
```

Even if `Todos` module is refactored in the future, there will be no impact on the modules `Projects` which is using `Todos`.

[References](https://jaysoo.ca/2016/02/28/organizing-redux-application/)

* #### Error Boundaries

Error boundaries are React components that **catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI** instead of the component tree that crashed.

```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

Then you can use it as a regular component:

```javascript
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```

[References](https://reactjs.org/docs/error-boundaries.html)

* #### Code Splitting
Code-splitting your app can help you “lazy-load” just the things that are currently needed by the user, which can dramatically improve the performance of your app.

[References](https://reactjs.org/docs/code-splitting.html)


### Possible New Features
* #### Search Bar
Search based on title, author with **Auto Complete** feature. This [elasticsearch](https://github.com/elastic/elasticsearch) library maybe helpful.

* #### Pagination or Infinity Scroll
If we have tons of books to load, the performance of the UI may become bad. We can choose to use **pagination** or **infinity scroll** to load data partially and get a better UI performance.

* #### Login
