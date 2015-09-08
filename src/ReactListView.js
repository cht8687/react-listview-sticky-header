import React, { Component } from 'react';

export default class ReactListView extends Component {

  static propTypes = {
    header: React.PropTypes.string.isRequired,
    items: React.PropTypes.array.isRequired
  };

  render() {
    const { header, items } = this.props;
    return (
      <ul>     
        <h1>{header}</h1>
        <h1>{items}</h1>
      </ul>
    );
  }
}
