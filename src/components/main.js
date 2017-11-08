import React from 'react';
import Footer from './footer';
import Menu from './menu';
import {connect} from 'react-redux';

class Main extends React.Component {
  render() {
    return (
      <div>
        <Menu cartItemsCount={this.props.totalQty}  />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state=>{
  return {
    totalQty: state.cart.totalQty
  }
}
export default connect(mapStateToProps)(Main);