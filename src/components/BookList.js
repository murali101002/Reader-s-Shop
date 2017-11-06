import React, { Component } from 'react';
import {Col} from 'react-bootstrap';
import BookItem from './BookItem'

class BookList extends Component {
  render() {
    return (
      <div>
        {
          this.props.books.map(book =>
            <Col xs={12} sm={6} md={4} key={book.id}>
              <BookItem 
                price={book.price}
                title={book.title}
                description={book.description}
              />
            </Col>
          )
        }
      </div>
    );
  }
}

export default BookList;