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

### Testing

```sh
TODO
yarn test
```
