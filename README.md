[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/cht8687/help)

<big><h1 align="center">React listview with sticky header</h1></big>

<p align="center">
  <a href="https://www.npmjs.com/package/react-listview-sticky-header">
    <img src="https://img.shields.io/npm/v/react-listview-sticky-header.svg?style=flat-square"
         alt="NPM Version">
  </a>

 <a href="https://coveralls.io/github/cht8687/react-listview-sticky-header?branch=master">
    <img src="https://coveralls.io/repos/cht8687/react-listview-sticky-header/badge.svg?branch=master&service=github" alt="Coverage Status" />
 </a>

  <a href="https://travis-ci.org/cht8687/react-listview-sticky-header">
    <img src="https://img.shields.io/travis/cht8687/react-listview-sticky-header.svg?style=flat-square"
         alt="Build Status">
  </a>

  <a href="https://npmjs.org/package/react-listview-sticky-header">
    <img src="http://img.shields.io/npm/dm/react-listview-sticky-header.svg?style=flat-square"
         alt="Downloads">
  </a>

  <a href="https://david-dm.org/cht8687/react-listview-sticky-header.svg">
    <img src="https://david-dm.org/cht8687/react-listview-sticky-header.svg?style=flat-square"
         alt="Dependency Status">
  </a>

  <a href="https://github.com/cht8687/react-listview-sticky-header/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/react-listview-sticky-header.svg?style=flat-square"
         alt="License">
  </a>
</p>

<p align="center"><big>

</big></p>



![React Listview sticky header](src/example/react-listview-sticky-header.gif)


## Installation

### npm

```
$ npm install --save react-listview-sticky-header
```

Since React is peer dependency, you need to install it manually if you haven't. 


## Demo

[http://cht8687.github.io/react-listview-sticky-header/example/](http://cht8687.github.io/react-listview-sticky-header/example/)


## Usage

```js
<ReactListView 
        data={data} 
        headerAttName="headerName"
        itemsAttName="items" 
        styles={styles}
      />
```

## Options

#### `data`: PropTypes.array.isRequired

```js
const DATALIST = [
{
 	headerName : "ListA",
    items : [{
      title : "items1"
    }, {
      title : "items2"
    }]
},
{
 	headerName : "ListB",
    items : [{
      title : "items1"
    }, {
      title : "items2"
    }]
}
];
```

#### `headerAttName`: PropTypes.string.isRequired

variable name of header in your `data` object.
In above example, it's `headerName`.

#### `itemsAttName`: PropTypes.string.isRequired

variable name which hold items data in your `data` object.
In above example, it's `items`.

#### `styles`: PropTypes.object.isRequired

```js
let styles = {
  outerDiv: {
    height: '400px',
    overflowY: 'auto',
    outline: '1px dashed blue',
    width: '400px',
  },

  ul: {
    margin: '0px',
    listStyleType: 'none',
    padding: '0'
  },

  fixedPosition: {
    position : 'fixed',
    width : '383px',
    top: '0px'
  },

  listHeader: {
    width: '383px',
    height: '20px',
    background: 'green',
    color: 'white'
  },

  listItems: {
    color: 'blue'
  },
};
```

`outerDiv`, `ul`, `fixedPosition`, `listHeader`, `listItems` are required, you can modify the CSS to meet your needs.


## Development

```
$ git clone git@github.com:cht8687/react-listview-sticky-header.git
$ cd react-listview-sticky-header
$ npm install
$ webpack-dev-server
```

*tip:* If you have already had webpack-dev-server running, you might have EADDRINUSE error, please ensure the port is not in use.

Then

```
open http://localhost:8080/webpack-dev-server/
```

## License

MIT
