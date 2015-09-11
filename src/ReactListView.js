import React, { Component } from 'react';
import ListHeader from './lib/ListHeader';
import ListItems from './lib/ListItems';

export default class ReactListView extends Component {
  static defaultProps = {
    events: ['scroll', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll', 'resize', 'touchmove', 'touchend']
  }

  static propTypes = {
    header: React.PropTypes.string.isRequired,
    items: React.PropTypes.array.isRequired,
    events: React.PropTypes.array
  };

  state = {
    events: this.props.events,
  }

  componentDidMount() {
    this.state.events.forEach(type => {
      if (window.addEventListener) {
        window.addEventListener(type, this.onScroll, false)
      } else {
        window.attachEvent('on' + type, this.onScroll, false)
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
    const { header, items } = this.props;
    return (
      <ul>     
        <ListHeader header={header} />
        <ListItems items={items}/>
      </ul>
    );
  }
}
