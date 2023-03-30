import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import BookFormModal from './BookFormModal';
import UpdateFormModal from './UpdateFormModal';



class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      show: false,
      updateShow: false,
      selectedBook: {}
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
  };


  //Delete Book
  deleteBook = async (id) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/books/${id}`;
      console.log(url);
      console.log(id);
      await axios.delete(url);

      let updateDeleteBooks = this.state.books.filter(book => book._id !== id);

      this.setState({
        books: updateDeleteBooks
      })

    } catch (error) {
      console.log(error.response)
    }
  };

  //Update Books
  updateBook = async (bookDataToUpdate) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/books/${bookDataToUpdate._id}`;
    
    
      let updateBook = await axios.put(url, bookDataToUpdate);

      console.log(updateBook);

      let updatedBooksArray = this.state.books.map(existingBook => {
        return existingBook._id === bookDataToUpdate._id ? updateBook.data
          : existingBook
      })

      this.setState({
        books: updatedBooksArray 
      })

    } catch (error) {
      console.log(error.message)
    }
  };


  // Handler for Post
  postBook = async (bookObj) => {
    try {
      console.log('postBook called');

      let url = `${process.env.REACT_APP_SERVER}/books`;
      console.log(url);
      console.log(bookObj);

      let createdBook = await axios.post(url, bookObj);

      console.log(createdBook);

      this.setState({
        books: [...this.state.books, createdBook.data]
      })

    } catch (error) {
      console.log(error.message)
    }

  };

  componentDidMount() {
    this.getBooks();
  };


  closeModal = () => {
    this.setState({
      show: false
    })
  };

  closeUpdateModal = () => {
    this.setState({
      updateShow: false
    })
  };

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
              Update or Delete Books
            </Accordion.Header>

            {this.state.books.map((book, idx) => {
              return (
                <Accordion.Body key={idx}>
                  <Button
                    onClick={() => this.deleteBook(book._id)}>Delete
                  </Button>
                  <Button
                    onClick={() => { this.setState({ updateShow: true, selectedBook: book}) }}>Update
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

        {this.state.updateShow && (
          <UpdateFormModal
            updateShow={this.state.updateShow}
            handleUpdateClose={this.closeUpdateModal}
            updateBook={this.updateBook}
            book={this.state.selectedBook}
          />
        )}



        {this.state.books.length ? (

          <Carousel>
            {this.state.books.map((book, idx) => (
              <Carousel.Item key={idx}>
                <img
                  className="d-block w-100"
                  src='https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
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
          <h3>No Books Found</h3>
        )}
      </>
    )
  }
};

export default BestBooks;
