import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const postingButton = () => {
  //state to manage modal view(whether it shows or not)
  const [show, setShow] = useState(false)

  //functions to show/close modal when clicked
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)
  //makes a post request to the db to put in information


  return(
    <div>
      <button onClick={handleShow}>Post New Item</button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Post New Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <input type='text'></input>
          </Form> 
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Close</button>
        </Modal.Footer>
      </Modal>
    </div>

  )
}

export default postingButton;