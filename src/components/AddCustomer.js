import React, { useState } from 'react'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function AddCustomer(props) {
  const [customer, setCustomer] = useState({
    firstname: '',
    lastname: '',
    streetaddress: '',
    postcode: '',
    city: '',
    email: '',
    phone: '',
  })

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleSave = () => {
    props.addCustomer(customer)
    handleClose()
  }

  const inputChanged = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value })
  }

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        style={{ textAlign: 'right' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          fill="currentColor"
          class="bi bi-plus-lg"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
          />
        </svg>
        {'  '} Add Customer
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        //backdrop="static"
        //keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add a customer </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form open={show} onClose={handleClose}>
            <Row>
              <Form.Group as={Col} controlId="formGridFirstName">
                <Form.Label>First name: </Form.Label>
                <Form.Control
                  name="firstname"
                  as="input"
                  placeholder="First name"
                  value={customer.firstname}
                  onChange={inputChanged}
                  type="text"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridLastName">
                <Form.Label>Last name: </Form.Label>
                <Form.Control
                  name="lastname"
                  placeholder="Last name"
                  defaultValue={customer.lastname}
                  onChange={inputChanged}
                  type="text"
                />
              </Form.Group>
            </Row>

            <Form.Group controlId="formGridAddress">
              <Form.Label>Street address: </Form.Label>
              <Form.Control
                name="streetaddress"
                placeholder="1234 Main St"
                defaultValue={customer.streetaddress}
                onChange={inputChanged}
                type="text"
              />
            </Form.Group>

            <Row>
              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Postcode: </Form.Label>
                <Form.Control
                  name="postcode"
                  defaultValue={customer.postcode}
                  onChange={inputChanged}
                  type="text"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City: </Form.Label>
                <Form.Control
                  name="city"
                  defaultValue={customer.city}
                  onChange={inputChanged}
                  type="text"
                />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email: </Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  defaultValue={customer.email}
                  onChange={inputChanged}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPhone">
                <Form.Label>Phone: </Form.Label>
                <Form.Control
                  name="phone"
                  defaultValue={customer.phone}
                  onChange={inputChanged}
                  type="text"
                />
              </Form.Group>
            </Row>

            <Button variant="outline-secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AddCustomer
