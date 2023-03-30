import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';



class UpdateFormModal extends React.Component {
  

  handleUpdateSubmit = (event) => {
    event.preventDefault();
    let bookObjToUpdate = {

      title: event.target.title.value,
      description: event.target.description.value,
      status: event.target.status.checked,
      _id: this.props.book._id,
      __v: this.props.book.__v
    }

    this.props.updateBook(bookObjToUpdate);
    this.props.handleUpdateClose();
  }
  
  render() {
    console.log(this.props);
    return (
  
      <>
        <Modal show={this.props.updateShow} onHide={this.props.handleUpdateClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleUpdateSubmit}>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Book Title</Form.Label>
                <Form.Control defaultValue={this.props.book.title} type="text" placeholder="Title" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control defaultValue={this.props.book.description}type="text" placeholder="Description" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="status">
                <Form.Check defaultChecked={this.props.book.status} type="checkbox" label="Is Available" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleUpdateClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>


    )
  }
}


export default UpdateFormModal;