import React, { Component, PropTypes } from 'react';

export default class ListItem extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired
  };

  render() {
    const { items } = this.props;
    return (
      <span>
      {
        Object.keys(items).map(index => {
          return (
            <span key={index}>{items[index]}<br /></span>
          );
        })
      }
      </span>
    );
  }
}
