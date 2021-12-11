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
    setCustomer({ ...customer, [event.target.name]: event.target.defaultValue })
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Customer
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
          <Form>
            <Row>
              <Form.Group as={Col} controlId="formGridFirstName">
                <Form.Label>First name: </Form.Label>
                <Form.Control
                  placeholder="First name"
                  defaultValue={customer.firstname}
                  onChange={inputChanged}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridLastName">
                <Form.Label>Last name: </Form.Label>
                <Form.Control
                  placeholder="Last name"
                  defaultValue={customer.lastname}
                  onChange={inputChanged}
                />
              </Form.Group>
            </Row>

            <Form.Group controlId="formGridAddress">
              <Form.Label>Street address: </Form.Label>
              <Form.Control
                placeholder="1234 Main St"
                defaultValue={customer.streetaddress}
                onChange={inputChanged}
              />
            </Form.Group>

            <Row>
              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Postcode: </Form.Label>
                <Form.Control
                  defaultValue={customer.postcode}
                  onChange={inputChanged}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City: </Form.Label>
                <Form.Control
                  defaultValue={customer.city}
                  onChange={inputChanged}
                />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email: </Form.Label>
                <Form.Control
                  type="email"
                  defaultValue={customer.email}
                  onChange={inputChanged}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPhone">
                <Form.Label>Phone: </Form.Label>
                <Form.Control
                  defaultValue={customer.phone}
                  onChange={inputChanged}
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
