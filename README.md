# react listview with sticky header

This project is trying to achieve listview with sticky headers using React.

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


## Why not css `position: sticky;`

Firstly, `position: sticky` is just for making the element fixed position.
you can check in the project file 'ReactListView.js' line 96:

```js
Object.assign(currentNode.style, this.props.styles.fixedPosition);
```

this is where I apply the fixed Position to the particular element. 

This project is trying to achieve the sticky effect when there are multiple elements involved. 
You can use `position:sticky` however, to replace this line of code.  Same thing. But you still need logic to handle the effect.


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

#### `itemsAttName`: PropTypes.object.isRequired

```js
let styles = {
  outerDiv: {
    height: '400px',
    overflowY: 'auto',
    outline: '1px dashed blue',
    width: '40%',
  },

  ul: {
    margin: '0px',
    listStyleType: 'none'
  },

  fixedPosition: {
    position : 'fixed',
    width : '300px',
    top: '0px'
  },

  listHeader: {
    width: '300px',
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
