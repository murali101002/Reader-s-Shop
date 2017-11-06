import React from 'react';
import { Well, Panel, Col, Row, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

class Cart extends React.Component {
  render() {
    if (this.props.cart[0]) return this.renderCart();
    return this.renderEmpty();
  }
  renderCart() {
    const cartItemList = this.props.cart.map(book => {
      return (
        <Panel key={book.id}>
          <Row>
            <Col xs={12} sm={4}>
              {book.title}
            </Col>
          </Row>
        </Panel>
      )
    })
    return (
      <Panel>
        {cartItemList}
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
export default connect(mapStateToProps)(Cart);
