import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import ReactListView from '..'
import { DATA } from './data'

let styles = {
  outerDiv: {
    height: '400px',
    overflowY: 'auto',
    outline: '1px dashed blue',
    width: '400px'
  },

  ul: {
    margin: '0px',
    listStyleType: 'none',
    padding: '0px'
  },

  fixedPosition: {
    position: 'fixed',
    width: '383px',
    top: '0px'
  },

  listHeader: {
    width: '383px',
    height: '27px',
    background: 'green',
    color: 'white'
  },

  listItems: {
    color: 'blue'
  }
}

class App extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  };

  render () {
    const { data } = this.props
    return (
      <ReactListView
        data={data}
        headerAttName='headerName'
        itemsAttName='items'
        styles={styles}
      />
    )
  }
}

const appRoot = document.createElement('div')
appRoot.id = 'app'
document.body.appendChild(appRoot)

render(<App data={DATA} />, appRoot)
