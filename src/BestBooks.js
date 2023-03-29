import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import BookFormModal from './BookFormModal';


class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      show: false
    }
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  getBooks = async () => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/books`;

      let bookData = await axios.get(url);

      this.setState({
        books: bookData.data
      })

    } catch (error) {
      console.error(error.response);
    }
  }


  //Delete Book
  deleteBook = async (id) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/books/${id}`;

      await axios.delete(url);

      let updatedBooks = this.state.books.filter(book => book !== id);

      this.setState({
        books: updatedBooks
      })

    } catch (error) {
      console.log(error.response)
    }
  }

  //Add cat to database with 2 handlers


  //handler - posts to db

  postBook = async (bookObj) => {
    try {
      console.log('postBook called');

      let url = `${process.env.React_APP_SERVER}/books`;

      let createdBook = await axios.post(url, bookObj);

      this.setState({
        books: [...this.state.books, createdBook.data]
      })

    } catch (error) {
      console.log(error.message)
    }

  }

  componentDidMount() {
    this.getBooks();
  }


  closeModal = () => {
    this.setState({
      show: false
    })
  }

  render() {

    /* TODO: render all the books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        <Button onClick={() => this.setState({ show: true })}>
          Add book
        </Button>

        <Accordion defaultActiveKey="0">
          <Accordion.Item>
            <Accordion.Header>
              Delete Books
            </Accordion.Header>

            {this.state.books.map((book, idx) => {
              return (
                <Accordion.Body key={idx}>
                  <Button
                    onClick={() => this.deleteBook(book.title)}>Delete
                  </Button>
                  Book Title: {book.title}  
                </Accordion.Body>
              )
            })}

          </Accordion.Item>
        </Accordion>

        {this.state.show && (
          <BookFormModal
            show={this.state.show}
            handleClose={this.closeModal}
            postBook={this.postBook}
          />
        )}




        {this.state.books.length ? (

          <Carousel>
            {this.state.books.map((book, idx) => (
              <Carousel.Item key={idx}>
                <img
                  className="d-block w-100"
                  src='https://via.placeholder.com/100'
                  alt="book"
                />
                <Carousel.Caption>
                  <h3>{book.title}</h3>
                  <p>{book.description}</p>
                </Carousel.Caption>
              </Carousel.Item>

            ))}
          </Carousel>
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
