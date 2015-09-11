import React from 'react';
import ReactListView from '..';

const styles = {
  'top': '20px',
  'height': '400px',
  'overflow-y': 'auto',
  'outline': '1px dashed red',
  'width': '40%'
};

class App extends React.Component {

  static propTypes = {
    data: React.PropTypes.array.isRequired
  };

  render() {
   const { data } = this.props;
    return (
      <div style={styles}>
      {
        // we are enable user to send in whatever header and items info from here
        Object.keys(data).map(k => {
          const { headerName, items } = data[k];
          return (
            <div key={k}>
              <ReactListView header={headerName} 
                             items={items}/>
            </div>
          );
        })
      }
      </div>
    );
  }
}

const DATALIST = [
  {
    headerName : "ListA",
    items : [{
      title : "items1"
    }, {
      title : "items2"
    }, {
      title : "items3"
    },{
      title : "items4"
    },{
      title : "items5"
    },{
      title : "items6"
    }]
  }, {
    headerName : "ListB",
    items : [{
      title : "items1"
    }, {
      title : "items2"
    }, {
      title : "items3"
    },{
      title : "items4"
    },{
      title : "items5"
    },{
      title : "items6"
    }]
  },{
    headerName : "ListC",
    items : [{
      title : "items1"
    }, {
      title : "items2"
    }, {
      title : "items3"
    },{
      title : "items4"
    },{
      title : "items5"
    },{
      title : "items6"
    }]
  },{
    headerName : "ListD",
    items : [{
      title : "items1"
    }, {
      title : "items2"
    }, {
      title : "items3"
    },{
      title : "items4"
    },{
      title : "items5"
    },{
      title : "items6"
    }]
  },{
    headerName : "ListE",
    items : [{
      title : "items1"
    }, {
      title : "items2"
    }, {
      title : "items3"
    },{
      title : "items4"
    },{
      title : "items5"
    },{
      title : "items6"
    }]
  },{
    headerName : "ListF",
    items : [{
      title : "items1"
    }, {
      title : "items2"
    }, {
      title : "items3"
    }]
  },{
    headerName : "ListG",
    items : [{
      title : "items1"
    }, {
      title : "items2"
    }, {
      title : "items3"
    },{
      title : "items4"
    },{
      title : "items5"
    },{
      title : "items6"
    }]
  },{
    headerName : "ListH",
    items : [{
      title : "items1"
    }, {
      title : "items2"
    }, {
      title : "items3"
    }]
  }
];

React.render(<App data= {DATALIST} />, document.body);

