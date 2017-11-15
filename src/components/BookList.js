import React, { Component } from 'react';
import {Col} from 'react-bootstrap';
import BookItem from './BookItem'

class BookList extends Component {
  render() {
    return (
      <div>
        {
          this.props.books.map(book =>
            <Col xs={12} sm={6} md={4} key={book._id}>
              <BookItem 
                _id={book._id}
                price={book.price}
                title={book.title}
                description={book.description}
                image={book.image}
              />
            </Col>
          )
        }
      </div>
    );
  }
}

export default BookList;