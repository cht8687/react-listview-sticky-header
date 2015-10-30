import React, { Component, PropTypes } from 'react';

export default class ListHeader extends Component {
  static propTypes = {
    header: PropTypes.string.isRequired,
    styles: PropTypes.object.isRequired
  };

  render() {
    const { header, styles } = this.props;
    return (
      <div ref="followWrap">
        <div ref="header" style={styles}>{header}</div>
      </div>
    );
  }  
}
