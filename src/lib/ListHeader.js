import React, {Component} from 'react';

const styles = {
  width: '300px',
  height: '20px',
  background: 'blue',
  color: 'white'
};

export default class ListHeader extends Component {
 static propTypes = {
    header: React.PropTypes.string.isRequired
  };

  render() {
    const { header } = this.props;
    return (
      <div ref="followWrap">
        <div ref="header" style={styles}>{header}</div>
      </div>
    );
  }  
}
