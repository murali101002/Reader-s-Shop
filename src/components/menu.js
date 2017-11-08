import React from 'react';
import { Nav, Navbar, NavItem, Badge } from 'react-bootstrap';
import {connect} from 'react-redux';

class Menu extends React.Component {
  getCartItemsCount(){
    this.props.cart.map(book=>book.qty).reduce((sum, value)=>sum+value, 0);
  }
  render() {
    return (
      <Navbar inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Reader's Shop</a>
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
              <Badge className="badge">{this.props.cart.map(book=>book.qty).reduce((sum, value)=>sum+value, 0)}</Badge>
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

export default connect(mapStateToProps)(Menu);