import React from 'react';
import { Well, Col, Row, Button } from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addBookToCart, getAllBooksFromCart} from '../actions/cartActions';

class BookItem extends React.Component {
  purchaseBook(){
    const book = [...this.props.cart, {
      qty: 1,
      _id: this.props._id,
      title: this.props.title,
      description: this.props.description,
      price: this.props.price
    }];
    if(this.props.cart.length>0){
      let _id = this.props._id;
      const bookIndex = this.props.cart.findIndex(book=>book._id===_id);
      if(bookIndex === -1) this.props.addBookToCart(book);
    }else{
      this.props.addBookToCart(book);
    }
  }
  render() {
    return (
      <Well>
        <Row>
          <Col xs={12}>
            <h6>{this.props.title}</h6>
            <p>{this.props.description}</p>
            <h6>{this.props.price}</h6>
            <Button
             bsStyle='primary'
             onClick = {this.purchaseBook.bind(this)}
             >Purchase</Button>
          </Col>
        </Row>
      </Well>
    );
  }
}
const mapDispatchToProps = dispatch=>{
  return bindActionCreators({addBookToCart, getAllBooksFromCart}, dispatch);
}
const mapStateToProps = state=>{
  return {cart: state.cart.cart}
}
export default connect(mapStateToProps, mapDispatchToProps)(BookItem);