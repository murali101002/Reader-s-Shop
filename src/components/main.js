import React from 'react';
import Footer from './footer';
import Menu from './menu';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { getBooks } from '../actions/bookActions';

class Main extends React.Component {
  componentDidMount() {
    this.props.getBooks();
  }
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
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getBooks }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);