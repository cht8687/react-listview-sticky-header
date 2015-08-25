import React, { Component } from 'react';

export default class ListHeader extends Component {

  static propTypes = {
    text: React.PropTypes.string.isRequired
  };

  render() {
    const { text } = this.props;
    return (
      <div> { text } </div>
    );
  }
}
