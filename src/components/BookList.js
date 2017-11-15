import React, { Component } from 'react';
import { Col, Carousel, Row, Grid } from 'react-bootstrap';
import BookItem from './BookItem'

const DisplayCarousel = props => {
  return (
    <Carousel>
      <Carousel.Item>
        <img width={900} height={300} alt="900x500" src="/images/carousel1.jpeg" />
      </Carousel.Item>
      <Carousel.Item>
        <img width={900} height={300} alt="900x500" src="/images/carousel2.jpeg" />
      </Carousel.Item>
      <Carousel.Item>
        <img width={900} height={300} alt="900x500" src="/images/carousel3.jpeg" />
      </Carousel.Item>
    </Carousel>
  );
}

class BookList extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Row>
            <DisplayCarousel />
          </Row>
          <Row style={{marginTop:'15px'}}>
            {
              this.props.books.map(book =>
                <Col xs={12} sm={6} key={book._id}>
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
          </Row>
        </Grid>
      </div>
    );
  }
}

export default BookList;