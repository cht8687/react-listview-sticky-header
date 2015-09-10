import React, { Component } from 'react';
import ListHeader from './lib/ListHeader';
import ListItems from './lib/ListItems';

export default class ReactListView extends Component {
  static propTypes = {
    header: React.PropTypes.string.isRequired,
    items: React.PropTypes.array.isRequired
  };

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
