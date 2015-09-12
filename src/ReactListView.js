import React, { Component } from 'react';
import ListHeader from './lib/ListHeader';
import ListItems from './lib/ListItems';

const styles = {
  'height': '400px',
  'overflowY': 'auto',
  'outline': '1px dashed red',
  'width': '40%'
};

export default class ReactListView extends Component {
  static defaultProps = {
    events: ['scroll', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll', 'resize', 'touchmove', 'touchend'],
    _instances:[]
  }

  static propTypes = {
    data: React.PropTypes.array.isRequired,
    headerAttName: React.PropTypes.string.isRequired,
    itemsAttName: React.PropTypes.string.isRequired,
    events: React.PropTypes.array
  };

  state = {
    events: this.props.events,
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
    this.state._instances = this.refsToArray(this, 'ListHeader');
    console.log(this.state._instances);
    

    // Register events listeners with the listview div
    this.state.events.forEach(type => {
      if (window.addEventListener) {
        React.findDOMNode(this.refs.listview).addEventListener(type, this.onScroll, false);
      } else {
        React.findDOMNode(this.refs.listview).attachEvent('on' + type, this.onScroll, false);
      }
    }, this);
  }

  onScroll() {

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
