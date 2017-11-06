import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux';

class App extends Component {
  render() {
    console.log('books', this.props.books);
    return (
      <div className="App">
      </div>
    );
  }
}

const mapStateToProps = state=>{
  return {
    books: state.book
  };
}
export default connect(mapStateToProps)(App);
