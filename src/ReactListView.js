import React, { Component, PropTypes } from 'react';
import ListHeader from './lib/ListHeader';
import ListItems from './lib/ListItems';

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

  constructor(props) {
    super(props);

    this.state = {
      events:['scroll', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll', 'resize', 'touchmove', 'touchend'],
      _firstChildWrapper: '',
      _headerFixedPosition:'',
      _instances: {}
    }
  }

  componentDidMount() {
    this.initStickyHeaders();
  }

  componentWillUnmount() {

  }

  componentDidUpdate() {

  }

  refsToArray(ctx, prefix) {
    let results = [];
    for (let i=0;;i++) {
      let ref = ctx.refs[prefix + '-' + String(i)];
      if (ref) results.push(ref);
      else return results;
    }
  }

  initStickyHeaders() {
    let listHeaders = this.refsToArray(this, 'ListHeader');
    let _originalPositions = listHeaders.map(l => {
      let headerAndPosInfo = {
        headerObj: l,
        originalPosition: l.refs.header.getDOMNode().getBoundingClientRect().top
      };
      return headerAndPosInfo;
    });
    
    this.setState({
      _instances: Object.assign(this.state._instances, {_originalPositions}),
      _firstChildWrapper: listHeaders[0].refs.followWrap,
      _headerFixedPosition: listHeaders[0].refs.header.getDOMNode().getBoundingClientRect().top
    });

    // Register events listeners with the listview div
    this.state.events.forEach(type => {
      if (window.addEventListener) {
        React.findDOMNode(this.refs.listview).addEventListener(type, this.onScroll.bind(this), false);
      } else {
        React.findDOMNode(this.refs.listview).attachEvent('on' + type, this.onScroll.bind(this), false);
      }
    });
  }

  onScroll() {
    
    // update current header positions and apply fixed positions to the top one
    let currentWindowScrollTop = 2 * this.state._headerFixedPosition - this.state._firstChildWrapper.getDOMNode().getBoundingClientRect().top;
    this.state._instances._originalPositions.forEach((c, index) => {
      let currentNode = c.headerObj.refs.header.getDOMNode();
      let nextNode = null;
      if(c.originalPosition <= currentWindowScrollTop) {
        // apply top value
        this.props.styles.fixedPosition.top = `${this.state._headerFixedPosition}px`;
        // apply fixed position style
        Object.assign( currentNode.style, this.props.styles.fixedPosition);
        if(index < this.state._instances._originalPositions.length - 1) {
          nextNode = this.state._instances._originalPositions[index + 1]; 
        }
        if(currentNode.getBoundingClientRect().top >= nextNode.originalPosition) {
          currentNode.style.position = 'absolute';
          currentNode.style.top = nextNode.originalPosition;
        }
      } else {
        currentNode.style.position = 'relative';
        currentNode.style.top = '0';
      }
    });
  } 

  render() {
    const { data, headerAttName, itemsAttName } = this.props;
    const { styles: {outerDiv, ul, listHeader, listItems, li} } = this.props;
    let _refi = 0;
    let makeRef = () => {
      return `ListHeader-${_refi++}`;
    };

    return (
      <div ref="listview" style={outerDiv}>
      <ul style={ul}>
      {
        Object.keys(data).map(k => {
        const header = data[k][headerAttName];
        const items  = data[k][itemsAttName];
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
        );
        })
      }
      </ul>
      </div>
    );
  }
}
