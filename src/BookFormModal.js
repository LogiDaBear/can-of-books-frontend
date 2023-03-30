import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';



class BookFormModal extends React.Component {
  

  handleBookSubmit = (event) => {
    event.preventDefault();
    let bookObj = {

      title: event.target.title.value,
      description: event.target.description.value,
      status: event.target.status.checked
    }

    this.props.postBook(bookObj);
    this.props.handleClose();
  }
  
  render() {
    return (
  
      <>
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleBookSubmit}>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Book Title</Form.Label>
                <Form.Control type="text" placeholder="Title" />
                <Form.Text className="text-muted">
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Description" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="status">
                <Form.Check type="checkbox" label="Is Available" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>


    )
  }
}


export default BookFormModal;