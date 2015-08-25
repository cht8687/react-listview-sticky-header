import React, { Component } from 'react';
import ListHeader from './lib/ListHeader';
import ListItem from './lib/ListItem';
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
            <ul>
              <ListHeader text = {k.headerName} />
              {
                _.each(k.items).map(function(n){
                  return (
                    <span>
                      <ListItem text = {n.title} />
                    </span>
                  )
                })
              }
            </ul>
          );
        })
      }
      </ul>
    );
  }
}
