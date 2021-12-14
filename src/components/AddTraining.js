import React, { useState } from 'react'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function AddTraining(props) {
  const [training, setTraining] = useState({
    date: '',
    activity: '',
    duration: '',
    customer: 'link.0.href',
  })

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleSave = () => {
    props.addTraining(props.row.data.customer, training)
    handleClose()
  }

  const inputChanged = (event) => {
    setTraining({ ...training, [event.target.name]: event.target.value })
  }

  return (
    <>
      <Button variant="outline-success" onClick={handleShow} size="sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          class="bi bi-plus-lg"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
          />
        </svg>
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        //backdrop="static"
        //keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add a training</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form open={show} onClose={handleClose}>
            <Row>
              <Form.Group as={Col} controlId="formGridDate">
                <Form.Label>Date: </Form.Label>
                <Form.Control
                  name="date"
                  as="input"
                  placeholder="Date"
                  value={training.date}
                  onChange={inputChanged}
                  type="text"
                />
              </Form.Group>

              <Form.Group controlId="formGridDuration">
                <Form.Label>Duration: </Form.Label>
                <Form.Control
                  name="duration"
                  placeholder="min"
                  defaultValue={training.duration}
                  onChange={inputChanged}
                  type="text"
                />
              </Form.Group>
            </Row>

            <Form.Group as={Col} controlId="formGridActivity">
              <Form.Label>Activity: </Form.Label>
              <Form.Control
                name="activity"
                placeholder="Activity"
                defaultValue={training.activity}
                onChange={inputChanged}
                type="text"
              />
            </Form.Group>

            <br />
            <Button variant="outline-secondary" onClick={handleClose}>
              Cancel
            </Button>
            {'  '}
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AddTraining
