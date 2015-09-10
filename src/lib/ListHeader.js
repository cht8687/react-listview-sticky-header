
import React, {Component} from 'react';

const styles = {
  background: 'blue',
  color: 'white',
  width: '250px',

};

export default class ListHeader extends Component {
 static propTypes = {
    header: React.PropTypes.string.isRequired
  };

  render() {
    const { header } = this.props;
    return (
      <span style={styles}>{header}<br /></span>
    );
  }  
}