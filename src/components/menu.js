import React from 'react';
import { Nav, Navbar, NavItem, Badge } from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getAllBooksFromCart} from '../actions/cartActions';

class Menu extends React.Component {
  getCartItemsCount(){
    this.props.cart.map(book=>book.qty).reduce((sum, value)=>sum+value, 0);
  }
  componentDidMount(){
    this.props.getAllBooksFromCart();
  }
  render() {
    return (
      <Navbar inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href='/'>Reader's Shop</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="/about">About</NavItem>
            <NavItem eventKey={2} href="/contact">Contact</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="/admin">Admin</NavItem>
            <NavItem 
              eventKey={2} href="/cart">
              Your Cart&nbsp;
              {
                this.props.cartItemsCount>0?
                    <Badge className="badge">{this.props.cartItemsCount}</Badge>:
                    ''
              }
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state=>{
  return {
    cart: state.cart.cart
  }
}

const mapDispatchToProps = dispatch=>{
  return bindActionCreators({getAllBooksFromCart}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);