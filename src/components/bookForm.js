import React from 'react';
import { Well, Row, Col, FormControl, Image, ControlLabel, Panel, Button, FormGroup, InputGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addBook, deleteBook } from '../actions/bookActions';
import axios from 'axios';
import '../App.css';

class BookForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      imgUrl: ''
    }
  }
  componentDidMount() {
    axios.get('/api/images')
      .then(response => {
        this.setState({ images: response.data });
      })
      .catch(error => {
        this.setState({ images: 'error in fetching the images', imgUrl: '' });
      })
  }

  selectItemFromList = imageName=>{
    this.setState({imgUrl:'/images/'+imageName})
  }

  handleSubmit() {
    const title = this._title.value;
    const description = this._description.value;
    const price = this._price.value;
    const image = this.state.imgUrl;
    const book = [{ title, description, price, image }];
    this.props.addBook(book);
  }
  onDeleteItem = () => {
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
    const imageList = this.state.images.map((image, i) => {
      return (
        <MenuItem
          key={i}
          onClick={this.selectItemFromList.bind(this, image.name)}
          >
          {image.name}
        </MenuItem>
      );
    })
    return (
      <Well style={{ marginTop: '20px' }}>
        <Row>
          <Col xs={12} sm={6}>
            <Panel>
              <FormGroup>
                <InputGroup>
                  <FormControl type="text" inputRef={input => this._selectValue = input} value={this.state.imgUrl} />
                  <DropdownButton
                    componentClass={InputGroup.Button}
                    id="input-dropdown-addon"
                    title="Select Image"
                  >
                    {imageList}
                  </DropdownButton>
                </InputGroup>
              </FormGroup>
              <Image src={this.state.imgUrl} responsive rounded/>
            </Panel>
          </Col>
          <Col xs={12} sm={6}>
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
                <FormControl componentClass="select" placeholder="select" inputRef={input => this._select = input}>
                  {optionList}
                </FormControl>
              </FormGroup>
              <Button onClick={this.onDeleteItem.bind(this)} bsStyle="danger">Delete</Button>
            </Panel>
          </Col>
        </Row>
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