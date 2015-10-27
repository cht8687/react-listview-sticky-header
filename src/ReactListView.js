import React, { Component, PropTypes } from 'react';
import ListHeader from './lib/ListHeader';
import ListItems from './lib/ListItems';

const styles = {
  outerDiv: {
    height: '400px',
    overflowY: 'auto',
    outline: '1px dashed red',
    width: '40%'
  },

  fixedPosition: {
    position : 'fixed',
    width : '300px',
    height : '20px'
  }
};

export default class ReactListView extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    headerAttName: PropTypes.string.isRequired,
    itemsAttName: PropTypes.string.isRequired,
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

  refsToArray(ctx, prefix){
    let results = [];
    for (let i=0;;i++){
      let ref = ctx.refs[prefix + '-' + String(i)];
      if (ref) results.push(ref);
      else return results;
    }
  }

  initStickyHeaders () {
    let listHeaders = this.refsToArray(this, 'ListHeader');

    //console.log(listHeaders[0].refs.header.getDOMNode().getBoundingClientRect().top);
    //console.log(listHeaders[0].refs.followWrap.getDOMNode().getBoundingClientRect().top);
    
    let _originalPositions = listHeaders.map(l => {
      let headerAndPosInfo = {
        headerObj: l,
        originalPosition: l.refs.header.getDOMNode().getBoundingClientRect().top
      };
      return headerAndPosInfo;
    });
    
    this.setState({
      _instances: Object.assign(this.state._instances, {_originalPositions})
    });

    this.setState({
      _firstChildWrapper: listHeaders[0].refs.followWrap
    });

    this.setState({
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
    
    // console.log(this.state._firstChildWrapper.getDOMNode().getBoundingClientRect().top);
    
    let currentWindowScrollTop = 2 * this.state._headerFixedPosition - this.state._firstChildWrapper.getDOMNode().getBoundingClientRect().top;
    
    console.log(this.state._instances._originalPositions);

    this.state._instances._originalPositions.forEach((c, index) => {

      let currentNode = c.headerObj.refs.header.getDOMNode();
      let nextNode = null;
      // let prevNode = null;

      if(c.originalPosition <= currentWindowScrollTop) {

        // apply fixed position style
        Object.assign(currentNode.style, styles.fixedPosition);

        // apply top value
        currentNode.style.top = this.state._headerFixedPosition;

        if(index < this.state._instances._originalPositions.length - 1) {
          nextNode = this.state._instances._originalPositions[index + 1]; 
        }

        console.log('currentTop: ' + currentWindowScrollTop);
        console.log('cur: ' + currentNode.getBoundingClientRect().top);
        console.log('next: ' + nextNode.originalPosition);
      
        if(currentNode.getBoundingClientRect().top >= nextNode.originalPosition) {
          currentNode.style.position = 'absolute';
          console.log('originalPosition: '+nextNode.originalPosition);
          currentNode.style.top = nextNode.originalPosition;
        }

      } else {

        currentNode.style.position = 'relative';
        // if(index >= 1) {
        //   if(this.state._instances._originalPositions[index - 1] != null) {
        //     prevNode = this.state._instances._originalPositions[index - 1];
        //   }
        // }

        // if(prevNode != null) {   
        //   console.log(prevNode);     
        //   if(prevNode.headerObj.refs.header.getDOMNode().style.position != undefined) {
        //     //prevNode.headerObj.refs.header.getDOMNode().style.position = 'relative';
        //   }
        // }

        // if(currentWindowScrollTop <= c.originalPosition) {
        //   prevNode.headerObj.refs.header.getDOMNode().style.position = '';
        // }
      }
    });
  } 

  render() {
    const { data, headerAttName, itemsAttName } = this.props;
    let _refi = 0;
    let makeRef = () => {
      return 'ListHeader-' + (_refi++);
    };

    return (
      <div ref="listview" style={styles.outerDiv}>
      <ul>
      {
        Object.keys(data).map(k => {
        const header = data[k][headerAttName];
        const items  = data[k][itemsAttName];
          return (
            <li key={k}>     
              <ListHeader ref={makeRef()} header={header} />
              <ListItems  items={items} />
            </li>
          );
        })
      }
      </ul>
      </div>
    );
  }
}
