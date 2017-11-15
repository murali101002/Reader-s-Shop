import React from 'react';
import { Well, Col, Row, Button, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addBookToCart, getAllBooksFromCart } from '../actions/cartActions';
import '../App.css';

class BookItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false
    }
  }
  purchaseBook() {
    const book = [...this.props.cart, {
      qty: 1,
      _id: this.props._id,
      title: this.props.title,
      description: this.props.description,
      price: this.props.price
    }];
    if (this.props.cart.length > 0) {
      let _id = this.props._id;
      const bookIndex = this.props.cart.findIndex(book => book._id === _id);
      if (bookIndex === -1) this.props.addBookToCart(book);
    } else {
      this.props.addBookToCart(book);
    }
  }

  onReadMore() {
    this.setState(prevState => ({
      isClicked: !prevState.isClicked
    }))
  }

  render() {
    return (
      <Well>
        <Row>
          <Col xs={6} sm={4} >
            <Image src={this.props.image} responsive rounded />
          </Col>
          <Col xs={6} sm={8} >
            <h5><strong>{this.props.title}</strong></h5>
            <p>
              {
                (this.props.description.length > 50 && this.state.isClicked === false) ?
                  (this.props.description.substring(0, 50)) : (this.props.description)
              }
              <button className="link" onClick={this.onReadMore.bind(this)}>
                {
                  (this.props.description.length > 50 && this.state.isClicked === false) ? ('...readMore') : ('')
                }
              </button>
            </p>
            <Row>
              <Col xs={5}>
                <h5>${this.props.price}</h5>
              </Col>
              <Col xs={3}>
                <Button
                  bsStyle='primary'
                  onClick={this.purchaseBook.bind(this)}
                >Buy</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Well>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addBookToCart, getAllBooksFromCart }, dispatch);
}
const mapStateToProps = state => {
  return { cart: state.cart.cart }
}
export default connect(mapStateToProps, mapDispatchToProps)(BookItem);