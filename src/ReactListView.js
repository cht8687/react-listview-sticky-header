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
  static defaultProps = {
    events: ['scroll', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll', 'resize', 'touchmove', 'touchend'],
    _instances:[],
    _positionMap: new Set(),
    _topPos:''
  }

  static propTypes = {
    data: React.PropTypes.array.isRequired,
    headerAttName: React.PropTypes.string.isRequired,
    itemsAttName: React.PropTypes.string.isRequired,
    events: React.PropTypes.array,
    _instances: React.PropTypes.array,
    _positionMap: React.PropTypes.object,
    _topPos: React.PropTypes.string
  };

  state = {
    events: this.props.events,
    _instances: this.props._instances,
    _positionMap: this.props._positionMap,
    _topPos: this.props._topPos
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
    this.props._instances.forEach((k)=>{
      this.props._positionMap.add(new HeaderPosInfo(
          k, 
          k.refs.header.getDOMNode().offsetTop,
          k.refs.header.getDOMNode().offsetHeight
        ));
    });
    let it = this.props._positionMap.values();
    let first = it.next();
    this.props._topPos = first.value.originalPosition;
  }

  initStickyHeaders () {
    this.props._instances = this.refsToArray(this, 'ListHeader');
    this.initHeaderPositions();

    // Register events listeners with the listview div
    this.props.events.forEach(type => {
      if (window.addEventListener) {
        React.findDOMNode(this.refs.listview).addEventListener(type, this.onScroll, false);
      } else {
        React.findDOMNode(this.refs.listview).attachEvent('on' + type, this.onScroll, false);
      }
    });
  }

  onScroll() {
    this.updatePos();
  }

  updatePos() {
    let currentWindowScrollTop = this.props._topPos;
    console.log(currentWindowScrollTop);
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
