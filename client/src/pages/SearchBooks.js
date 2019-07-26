import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import { Col, Row, Container } from "../components/Grid";
import SearchForm from "../components/SearchForm";
import ResultsList from "../components/ResultsList"

import API from "../utils/API";

const DebugOn = true;

class SearchBooks extends Component {
    state = {
    title: "",
    books: [],
    error: "",
    message: ""
  };

  // Event handler to get value [title of book] from search form
  // with each key pressed
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // Event handler for the submit button press
  handleSubmitForm = event => {
    event.preventDefault();

    // only do the search if a title was entered
    if (this.state.title) {

      // Google Books API  
      API.getSearchGoogleBooks(this.state.title)       
        .then(res => {
            // store response in a array
            let results = res.data.items
            if (DebugOn) console.log ("Search Results: ", results);

            //map through the array 
            results = results.map(result => { 
                result = {
                    key: result.id,
                    id: result.id,
                    title: result.volumeInfo.title,
                    author: result.volumeInfo.authors,
                    description: result.volumeInfo.description,
                    image: result.volumeInfo.imageLinks.thumbnail,
                    link: result.volumeInfo.infoLink
                }
                return result;
            })

            // set the array of books, clear the title field, clear the error field
            this.setState({ 
                books: results, 
                title: "",
                error: "" 
            })
        })
        .catch(err => this.setState({ error: err.items }));

    }  // if (this.state.title) {
  };

  // Event handler to save a book in the database
  handleSaveButton = event => {
    event.preventDefault();

    if (DebugOn) console.log(this.state.books)

    let savedBooks = this.state.books.filter(book => book.id === event.target.id)
    savedBooks = savedBooks[0];
    API.saveBook(savedBooks)
        .then(this.setState({ message: alert("Your book is saved") }))
        .catch(err => console.log(err))
  };

  render() {
    return (
      <Container fluid>

        <Jumbotron>
            <h1>React Google Books Search</h1>
            <h3>Enter a book title to Search and Save your Favorites</h3>
            <hr/>
            <p className="lead">
                <Link className="btn btn-default btn-lg" to="/" role="button">New Search</Link>
                <Link className="btn btn-default btn-lg" to="/saved" role="button">Saved Books</Link>
            </p>
        </Jumbotron>

        <Container>
            <Row>
                <Col size="10">
                    <form>
                    <Input
                        value={this.state.title}
                        onChange={this.handleInputChange}
                        name="title"
                        placeholder="Input Book Title (required)"
                    />
                    </form>
                </Col>
                <Col size="2">
                    <FormBtn
                        disabled={!this.state.title}
                        onClick={this.handleSubmitForm}
                    >
                        Submit Book
                    </FormBtn>
                </Col>
            </Row>
        </Container>

        <br></br>
        <Container>
            <SearchResult books={this.state.books} handleSaveButton={this.handleSaveButton} />
        </Container>

      </Container>
    );
  }
}

export default SearchBooks;
