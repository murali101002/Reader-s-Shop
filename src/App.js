import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getBooks } from './actions/bookActions';
import { Grid, Col, Row } from 'react-bootstrap';
import BookList from './components/BookList';
import BookForm from './components/bookForm';
import Cart from './components/cart';

class App extends Component {
  componentDidMount() {
    this.props.getBooks();
  }
  render() {
    return (
      <Grid className="App">
        <Cart />
        <Col xs={12} sm={6}>
          <BookForm />
        </Col>
        <Col>
          <Row style={{ marginTop: '15px' }}>
            <BookList books={this.props.books} />
          </Row>
        </Col>
      </Grid>
    );
  }
}

/*
mapStateToProps receives store object from its parent via <Provider/>
this prevents the exposure of store object and only gives access to the data required for the component
*/
const mapStateToProps = state => {
  return {
    books: state.book.books
  };
}
/*
mapDispatchToProps dispatches the methods defined in actions through props
Ex: getBooks is one of the actions to retrieve all the books in data source.
we can make a call to getBooks action using 'store.dispatch(getBooks)'. 
The catch here is it exposes store object to every component which is not recommended
mapDispatchToProps dispatches the actions in more elegant way and prevents the exposure of 'store' object
*/
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getBooks }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
