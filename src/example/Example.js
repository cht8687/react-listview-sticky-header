import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import ReactListView from '..'
import { DATA } from './data'

let styles = {
  outerDiv: {
    height: '420px',
    overflowY: 'auto',
    outline: '#b9ceb6 dashed 1px',
    width: '383px',
    margin: '0 auto'
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
    background: '#94D6CF',
    color: 'white'
  },

  listItems: {
    color: '#a9adab'
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
