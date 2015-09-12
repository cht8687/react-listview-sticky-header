import React, { Component } from 'react';
import ListHeader from './lib/ListHeader';
import ListItems from './lib/ListItems';

const styles = {
  'top': '20px',
  'height': '400px',
  'overflowY': 'auto',
  'outline': '1px dashed red',
  'width': '40%'
};

export default class ReactListView extends Component {
  static defaultProps = {
    events: ['scroll', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll', 'resize', 'touchmove', 'touchend']
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
    this.state.events.forEach(type => {
      if (window.addEventListener) {
        React.findDOMNode(this.refs.listview).addEventListener(type, this.onScroll, false)
      } else {
        React.findDOMNode(this.refs.listview).attachEvent('on' + type, this.onScroll, false)
      }
    }, this);
  }

  componentWillUnmount() {

  }

  componentDidUpdate() {

  }

  onScroll() {
    window.console.log('scrolling');
  }

  render() {
    const { data, headerAttName, itemsAttName } = this.props;
    return (
      <div ref="listview" style={styles}>
      {
        Object.keys(data).map(k => {
          const header = data[k][headerAttName];
          const items  = data[k][itemsAttName];
          return (
            <ul key={k}>     
              <ListHeader header={header} />
              <ListItems items={items} />
            </ul>
          );
        })
      }
      </div>
    );
  }
}
