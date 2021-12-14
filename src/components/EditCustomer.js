import React, { useState } from 'react'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function EditCustomer(props) {
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
  const handleShow = () => {
    setCustomer({
      firstname: props.row.data.firstname,
      lastname: props.row.data.lastname,
      streetaddress: props.row.data.streetaddress,
      postcode: props.row.data.postcode,
      city: props.row.data.city,
      email: props.row.data.email,
      phone: props.row.data.phone,
    })
    setShow(true)
  }

  const handleSave = () => {
    props.editCustomer(props.row.value, customer)
    handleClose()
  }

  const inputChanged = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value })
  }

  return (
    <>
      <Button variant="outline-primary" onClick={handleShow} size="sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="currentColor"
          class="bi bi-pen"
          viewBox="0 0 16 16"
        >
          <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
        </svg>
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        //backdrop="static"
        //keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit a customer </Modal.Title>
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

export default EditCustomer
