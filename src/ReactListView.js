import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import ListHeader from './lib/ListHeader'
import ListItems from './lib/ListItems'

export default class ReactListView extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    headerAttName: PropTypes.string.isRequired,
    itemsAttName: PropTypes.string.isRequired,
    styles: PropTypes.object.isRequired,
    events: PropTypes.array,
    _positionMap: PropTypes.object,
    _topPos: PropTypes.string,
    _topWrapper: PropTypes.object
  }

  constructor (props) {
    super(props)

    this.state = {
      events: ['scroll', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll', 'resize', 'touchmove', 'touchend'],
      _firstChildWrapper: '',
      _headerFixedPosition: '',
      _instances: {}
    }
  }

  componentDidMount () {
    this.initStickyHeaders()
  }

  componentWillUnmount () {
     // unRegister events listeners with the listview div
    this.state.events.forEach((type) => {
      if (window.addEventListener) {
        findDOMNode(this.refs.listview).removeEventListener(type, this.onScroll.bind(this), false)
      } else {
        findDOMNode(this.refs.listview).attachEvent('on' + type, this.onScroll.bind(this), false)
      }
    })
  }

  refsToArray (ctx, prefix) {
    let results = []
    for (let i = 0; ;i++) {
      let ref = ctx.refs[prefix + '-' + String(i)]
      if (ref) results.push(ref)
      else return results
    }
  }

  initStickyHeaders () {
    let listHeaders = this.refsToArray(this, 'ListHeader')
    let _originalPositions = listHeaders.map((l) => {
      let headerAndPosInfo = {
        headerObj: l,
        originalPosition: l.refs.header.getBoundingClientRect().top
      }
      return headerAndPosInfo
    })
    this.setState({
      _instances: Object.assign(this.state._instances, {_originalPositions}),
      _firstChildWrapper: listHeaders[0].refs.followWrap,
      _headerFixedPosition: listHeaders[0].refs.header.getBoundingClientRect().top
    })

    // Register events listeners with the listview div
    this.state.events.forEach((type) => {
      if (window.addEventListener) {
        findDOMNode(this.refs.listview).addEventListener(type, this.onScroll.bind(this), false)
      } else {
        findDOMNode(this.refs.listview).attachEvent('on' + type, this.onScroll.bind(this), false)
      }
    })
  }

  onScroll () {
    // update current header positions and apply fixed positions to the top one
    let currentWindowScrollTop = 2 * this.state._headerFixedPosition - this.state._firstChildWrapper.getBoundingClientRect().top
    this.state._instances._originalPositions.forEach((c, index) => {
      let currentNode = c.headerObj.refs.header
      const currentHeaderHeight = parseInt(currentNode.style.height, 10)
      let nextNode = null
      let topPos = null
      let ignoreCheck = false
      if (index < this.state._instances._originalPositions.length - 1) {
        nextNode = this.state._instances._originalPositions[index + 1]
      }
      if (nextNode) {
        topPos = -(currentWindowScrollTop + (index + 2) * currentHeaderHeight - nextNode.originalPosition - this.state._headerFixedPosition)
      }
      if (index === 0) {
        if (currentWindowScrollTop === c.originalPosition) {
          currentNode.style.position = ''
          ignoreCheck = true
        }
      }
      if (!ignoreCheck && (c.originalPosition) < (currentWindowScrollTop + this.state._headerFixedPosition + currentHeaderHeight * 1)) {
        Object.assign(currentNode.style, this.props.styles.fixedPosition)
        // apply top value
        currentNode.style.top = `${this.state._headerFixedPosition}px`
        if (currentWindowScrollTop + (index + 2) * currentHeaderHeight > nextNode.originalPosition) {
          currentNode.style.position = 'absolute'
          currentNode.style.top = `${topPos}px`
        }
      } else {
        currentNode.style.position = ''
      }
    })
  }

  render () {
    const { data, headerAttName, itemsAttName } = this.props
    const { styles: {outerDiv, ul, listHeader, listItems, li} } = this.props
    let _refi = 0
    let makeRef = () => {
      return `ListHeader-${_refi++}`
    }

    return (
      <div ref='listview' style={outerDiv}>
        <ul style={ul}>
        {
          Object.keys(data).map((k) => {
            const header = data[k][headerAttName]
            const items = data[k][itemsAttName]
            return (
              <li li={li} key={k}>
                <ListHeader
                  ref={makeRef()}
                  header={header}
                  styles={listHeader}
                />
                <ListItems
                  items={items}
                  styles={listItems}
                />
              </li>
            )
          })
        }
        </ul>
      </div>
    )
  }
}
