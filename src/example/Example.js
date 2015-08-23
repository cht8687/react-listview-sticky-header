import React from 'react';
import ReactListView from '..';

class App extends React.Component {

  static propTypes = {
    data: React.PropTypes.array.isRequired
  };

  render() {
   const { data } = this.props;
    return (
      <div>
        <ReactListView
         data = { data }
        />
      </div>
    );
  }
}

const DATALIST = [
  {
    headerName : "A",
    items : [{
      title : "A_A"
    }, {
      title : "A_B"
    }, {
      title : "A_C"
    }]
  }, {
    headerName : "B",
    items : [{
      title : "B_A"
    }, {
      title : "B_B"
    }, {
      title : "B_C"
    }]
  },{
    headerName : "C",
    items : [{
      title : "C_A"
    },{
      title : "C_B"
    },{
      title : "C_C"
    }]
  },{
    headerName : "D",
    items : [{
      title : "D_A"
    },{
      title : "D_B"
    },{
      title : "D_C"
    }]
  },{
    headerName : "E",
    items : [{
      title : "E_A"
    },{
      title : "E_B"
    },{
      title : "E_C"
    }]
  },{
    headerName : "F",
    items : [{
      title : "F_A"
    },{
      title : "F_B"
    },{
      title : "F_C"
    }]
  },{
    headerName : "G",
    items : [{
      title : "G_A"
    },{
      title : "G_B"
    },{
      title : "G_C"
    }]
  },{
    headerName : "H",
    items : [{
      title : "H_A"
    },{
      title : "H_B"
    },{
      title : "H_C"
    }]
  }
];

React.render(<App data= { DATALIST } />, document.body);

