import React, { Component } from 'react';
import _ from 'lodash';

export default class ListItem extends Component {

  static propTypes = {
    items: React.PropTypes.string.isRequired
  };

  render() {
    const { items } = this.props;
    return (
      <span>
      {
        _.each(items).map((k) => {
          return (
            <span>{k}<br /></span>
          );
        })
      }
      </span>
    );
  }
}
