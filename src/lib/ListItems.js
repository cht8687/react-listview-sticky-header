import React, { Component, PropTypes } from 'react';

export default class ListItem extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    styles: PropTypes.object.isRequired
  };

  render() {
    const { items, styles } = this.props;
    return (
      <span>
      {
        [...items].map((item, index) => {
          return (
            <span key={index} style={styles}>{item.title}<br /></span>
          );
        })
      }
      </span>
    );
  }
}
