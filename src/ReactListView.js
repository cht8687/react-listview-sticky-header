import React, { Component } from 'react';
import _ from 'lodash';

export default class ReactListView extends Component {

  static propTypes = {
    data: React.PropTypes.array.isRequired
  };

  render() {
    const { data } = this.props;
    return (
      <ul>     
      {
        _.each(data).map(function(k) {
          return (
            <div>
              <div> {k.headerName} </div>
              <div> {k.item} </div>
            </div>
          );
        })
      }
      </ul>
    );
  }
}
