import React, {Component} from 'react';

export default class ListHeader extends Component {
 static propTypes = {
    header: React.PropTypes.object.isRequired
  };

  render() {
    const { header } = this.props;
    return (
      <span>{header}<br /></span>
    );
  }  
}