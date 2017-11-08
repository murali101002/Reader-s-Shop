import React from 'react';
import { Panel, Col, Row, Button, Label, ButtonGroup, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteBookFromCart, updateBookInCart } from '../actions/cartActions';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
  }
  render() {
    if (this.props.cart.length > 0) return this.renderCart();
    return this.renderEmpty();
  }
  deleteBook(_id) {
    const booksInCart = this.props.cart;
    const bookToDeleteIndex = booksInCart.findIndex(book=>book._id==_id);
    let updatedCart = [...booksInCart.slice(0, bookToDeleteIndex), ...booksInCart.slice(bookToDeleteIndex+1)];
    this.props.deleteBookFromCart(updatedCart);
  }
  incrementQty(book) {
    this.props.updateBookInCart(book._id, 1, this.props.cart);
  }
  decrementQty(book) {
    if (book.qty > 1) {
      this.props.updateBookInCart(book._id, -1, this.props.cart);
    }
  }
  // totalCartPrice() {
  //   const total = this.props.cart.map(book => +book.price).reduce((sum, value) => sum + value);
  //   return Math.round(total * 100) / 100;
  // }
  open() {
    this.setState({ showModal: true });
  }
  close() {
    this.setState({ showModal: false });
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
            <h6>Total Amount: {this.props.totalAmount}</h6>
            <Button onClick={this.open.bind(this)} bsStyle="success">Checkout</Button>
          </Col>
        </Row>
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Test
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </Panel>
    );
  }
  renderEmpty() {
    return <div></div>;
  }
}
const mapStateToProps = state => {
  return {
    cart: state.cart.cart,
    totalAmount: state.cart.totalAmount
  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ deleteBookFromCart, updateBookInCart }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
