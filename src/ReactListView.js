import React, { Component } from 'react';
import ListHeader from './lib/ListHeader';
import ListItems from './lib/ListItems';

const styles = {
  'height': '400px',
  'overflowY': 'auto',
  'outline': '1px dashed red',
  'width': '40%'
};

class HeaderPosInfo {
  constructor(headerObj, originalPosition, originalHeight) {
    this.headerObj = headerObj;
    this.originalPosition = originalPosition;
    this.originalHeight = originalHeight; 
  }
}

export default class ReactListView extends Component {
  static propTypes = {
    data: React.PropTypes.array.isRequired,
    headerAttName: React.PropTypes.string.isRequired,
    itemsAttName: React.PropTypes.string.isRequired,
    events: React.PropTypes.array,
    _instances: React.PropTypes.array,
    _positionMap: React.PropTypes.object,
    _topPos: React.PropTypes.string,
    _topWrapper: React.PropTypes.object
  }
  constructor(props) {
    super(props);

    this.state = {
      _instances:{},
      _positionMap: {},
      events:['scroll', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll', 'resize', 'touchmove', 'touchend']
    }

  }

  componentDidMount() {
    this.initStickyHeaders();
  }

  componentWillUnmount() {

  }

  componentDidUpdate() {

  }

  refsToArray(ctx, prefix){
    let results = [];
    for (let i=0;;i++){
      let ref = ctx.refs[prefix + '-' + String(i)];
      if (ref) results.push(ref);
      else return results;
    }
  }

  initHeaderPositions() {
    // Retrieve all instance of headers and store position info
    
    let instances = new Set();
    this.state._instances.listHeaders.forEach(k => {
      instances.add(new HeaderPosInfo(
        k, 
        k.refs.header.getDOMNode().offsetTop,
        k.refs.header.getDOMNode().offsetHeight
      ))
    });

    // set state
    this.setState({
        _positionMap: Object.assign(this.state._positionMap, 
          instances
        )
    });
  }

  initStickyHeaders () {
    let listHeaders = this.refsToArray(this, 'ListHeader');

    this.setState({
      _instances: Object.assign(this.state._instances, { listHeaders })
    });

    this.initHeaderPositions();

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
    console.log(this.state._instances.listHeaders[0].refs.header.getDOMNode().getBoundingClientRect().top);
    
  }

  render() {
    const { data, headerAttName, itemsAttName } = this.props;
    let _refi = 0;
    let makeRef = () => {
      return 'ListHeader-' + (_refi++);
    };

    return (
      <div ref="listview" style={styles}>
      {
        Object.keys(data).map(k => {
        const header = data[k][headerAttName];
        const items  = data[k][itemsAttName];
          return (
            <ul key={k}>     
              <ListHeader ref={makeRef()} header={header} />
              <ListItems  items={items} />
            </ul>
          );
        })
      }
      </div>
    );
  }
}
