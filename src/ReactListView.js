import React, { Component } from 'react';
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
      _instances: {},
      events:['scroll', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll', 'resize', 'touchmove', 'touchend'],
      _firstChildWrapper: '',
      _headerFixedPosition:''
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
    
    console.log(listHeaders[0].refs.followWrap.getDOMNode().getBoundingClientRect().top);

    this.setState({
      _firstChildWrapper: listHeaders[0].refs.followWrap
    });

    this.setState({
      _headerFixedPosition: listHeaders[0].refs.header.getDOMNode().getBoundingClientRect().top
    });

    this.setState({
      _instances: Object.assign(this.state._instances, {listHeaders})
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
    
    console.log(this.state._firstChildWrapper.getDOMNode().getBoundingClientRect().top);
    
    this.state._instances.listHeaders.forEach((c) => {

      let currentNode = c.refs.header.getDOMNode();
      
      if(currentNode.getBoundingClientRect().top <= this.state._headerFixedPosition) {

        // apply fixed position style
        Object.assign(currentNode.style, styles.fixedPosition);

        // apply top value
        currentNode.style.top = this.state._headerFixedPosition;



      } else {


        
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
