import React from 'react';
import { Well, FormControl, ControlLabel, Panel, Button, FormGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addBook, deleteBook } from '../actions/bookActions';

class BookForm extends React.Component {
  handleSubmit() {
    const title = this._title.value;
    const description = this._description.value;
    const price = this._price.value;
    const book = [{ title, description, price }];
    this.props.addBook(book);
  }
  onDeleteItem = ()=>{
    const id = this._select.value;
    this.props.deleteBook(id);
  }
  render() {
    const optionList = this.props.books.map(book => {
      return (
        <option key={book._id}>
          {book._id}
        </option>
      );
    })
    return (
      <Well style={{marginTop:'20px'}}>
        <Panel>
          <FormGroup controlId='title'>
            <ControlLabel>Title</ControlLabel>
            <FormControl
              type="text"
              inputRef={input => this._title = input}
              placeholder="Enter Title"
            />
          </FormGroup>
          <FormGroup controlId='description'>
            <ControlLabel>Description</ControlLabel>
            <FormControl
              type="text"
              inputRef={input => this._description = input}
              placeholder="Enter Description"
            />
          </FormGroup>
          <FormGroup controlId='price'>
            <ControlLabel>Price</ControlLabel>
            <FormControl
              type="text"
              inputRef={input => this._price = input}
              placeholder="Enter Price"
            />
          </FormGroup>
          <Button
            bsStyle='primary'
            onClick={this.handleSubmit.bind(this)}
          >Add Book</Button>
        </Panel>
        <Panel>
          <FormGroup controlId="formControlsSelectMultiple">
            <ControlLabel>Select</ControlLabel>
            <FormControl componentClass="select" placeholder="select" inputRef={input=>this._select=input}>
              {optionList}
            </FormControl>
          </FormGroup>
          <Button onClick={this.onDeleteItem.bind(this)} bsStyle="danger">Delete</Button>
        </Panel>
      </Well>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addBook, deleteBook }, dispatch);
}
const mapStateToProps = state => {
  return {
    books: state.book.books
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(BookForm);