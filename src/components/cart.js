import React from 'react';
import { Well, Panel, Col, Row, Button, Label, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteBookFromCart, updateBookInCart } from '../actions/cartActions';

class Cart extends React.Component {
  render() {
    if (this.props.cart.length > 0) return this.renderCart();
    return this.renderEmpty();
  }
  deleteBook(_id) {
    this.props.deleteBookFromCart(_id);
  }
  incrementQty(book) {
    const bookPrice = book.price;
    this.props.updateBookInCart({ ...book, qty: ++book.qty, price: book.price / (book.qty - 1) + book.price });
  }
  decrementQty(book) {
    const bookPrice = book.price;
    if (book.qty > 1) {
      this.props.updateBookInCart({ ...book, qty: --book.qty, price: book.price - book.price / (book.qty + 1) });
    }
  }
  totalCartPrice(){
    const total = this.props.cart.map(book=>+book.price).reduce((sum,value)=>sum+value);
    return Math.round(total*100)/100;
  }
  renderCart() {
    const cartItemList = this.props.cart.map(book => {
      return (
        <Panel key={book._id}>
          <Row>
            <Col xs={12} sm={4}>
              <h6>{book.title}</h6><span>     </span>
            </Col>
            <Col xs={6} sm={2}>
              <h6>${Math.round(+book.price * 100) / 100}</h6>
            </Col>
            <Col xs={6} sm={2}>
              <h6>qty. <Label bsStyle="success">{book.qty}</Label></h6>
            </Col>
            <Col xs={6} sm={2}>
              <ButtonGroup style={{ minWidth: '300px' }}>
                <Button onClick={this.incrementQty.bind(this, book)} bsStyle="default" bsSize="small">+</Button>
                <Button onClick={this.decrementQty.bind(this, book)} bsStyle="default" bsSize="small">-</Button>
              </ButtonGroup>
            </Col>
            <Col xs={6} sm={2}>
              <Button onClick={this.deleteBook.bind(this, book._id)} bsStyle="danger" bsSize="small">Delete</Button>
            </Col>
          </Row>
        </Panel>
      )
    })
    return (
      <Panel header="Cart" bsStyle="primary">
        {cartItemList}
        <Row>
          <Col xs={12}>
            <h6>Total Amount: {Math.round(this.props.cart.map(book=>book.price).reduce((sum,value)=>sum+value)*100)/100}</h6>
            <Button bsStyle="success">Checkout</Button>
          </Col>
        </Row>
      </Panel>
    );
  }
  renderEmpty() {
    return <div></div>;
  }
}
const mapStateToProps = state => {
  return {
    cart: state.cart.cart
  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ deleteBookFromCart, updateBookInCart }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
